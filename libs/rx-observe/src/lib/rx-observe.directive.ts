import {
    Directive,
    EmbeddedViewRef,
    inject,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject, Subscription,} from 'rxjs';
import {
    combineLatestWith,
    distinctUntilChanged,
    filter,
    map,
    mergeAll,
    startWith,
    switchMap,
    withLatestFrom,
} from 'rxjs/operators';
import {
    injectStreamDirectiveConfig,
    RX_OBSERVE_DIRECTIVE_CONTEXT,
    RxObserveDirectiveConfig,
} from './rx-observe-directive-config';
import {isViewportRenderStrategy, RenderStrategies,} from './types/render-strategies';
import {coerceObservable} from './util/coerce-observable';
import {RenderContext} from './types/render-context';
import {ObserveDirectiveContext} from './types/observe-directive-context';
import {setupOperator$} from './util/setup-operator';
import {createIntersectionObserver} from './util/create-intersection-observer';
import {supportsIntersectionObserver} from './util/supports-intersection-observer';

@Directive({
  selector: '[rxObserve]',
  standalone: true,
})
export class RxObserveDirective<T> implements OnInit, OnDestroy {
  private readonly config: RxObserveDirectiveConfig | null =
    injectStreamDirectiveConfig();
  private readonly templateRef: TemplateRef<ObserveDirectiveContext<T>> =
    inject(TemplateRef<ObserveDirectiveContext<T>>);
  private readonly viewContainerRef: ViewContainerRef =
    inject(ViewContainerRef);

  private source$$ = new ReplaySubject<Observable<T | null>>(1);
  private refreshEffect$$ = new ReplaySubject<Subject<any>>(1);
  private loadingTemplate$$ = new ReplaySubject<
    TemplateRef<ObserveDirectiveContext<T>>
  >(1);
  private renderCallback$$: ReplaySubject<RenderContext<T>> | undefined;
  private renderStrategy$$ = new BehaviorSubject<Observable<RenderStrategies>>(
    of(this.config?.renderStrategy ?? { type: 'default' })
  );

  private detach = true;

  /**
   * @description
   * The source of the values to be rendered.
   * @param source
   */
  @Input() set rxObserve(source: Observable<T | null>) {
    if (source) {
      this.source$$.next(source);
    }
  }

  /**
   * @description
   * A trigger to refresh the value stream.
   * @param refreshEffect
   */
  @Input() set rxObserveRefreshSignal(refreshEffect: Subject<any>) {
    if (refreshEffect) {
      this.refreshEffect$$.next(refreshEffect);
    }
  }

  /**
   * @description
   * A template to be rendered while the stream is in a loading state.
   * @param tpl
   */
  @Input() set rxObserveLoadingTemplate(
    tpl: TemplateRef<ObserveDirectiveContext<T>>
  ) {
    if (tpl) {
      this.loadingTemplate$$.next(tpl);
    }
  }

  /**
   * @description
   * A template to be rendered when the value source emits an error.
   */
  @Input() rxObserveErrorTemplate:
    | TemplateRef<ObserveDirectiveContext<T>>
    | undefined;
  /**
   * @description
   * A template to be rendered when the value source completes.
   */
  @Input() rxObserveCompleteTemplate:
    | TemplateRef<ObserveDirectiveContext<T>>
    | undefined;

  /**
   * @description
   * A trigger which emits every time the view is rendered/updated.
   * @param cb
   */
  @Input() set rxObserveRenderCallback(cb: ReplaySubject<RenderContext<T>>) {
    if (cb) {
      this.renderCallback$$ = cb;
    }
  }

  /**
   * @description
   * A render strategy to optimize change detection.
   *
   * Default: {@link DefaultRenderStrategy}
   * @param strategy
   */
  @Input() set rxObserveRenderStrategy(
    strategy: RenderStrategies | Observable<RenderStrategies>
  ) {
    if (strategy) {
      this.renderStrategy$$.next(coerceObservable(strategy));
    }
  }

  /**
   * @description
   * A flag to control whether the last value should still be displayed in the view when the value source
   * is in a loading state or not.
   *
   * Default: false
   */
  @Input() rxObserveKeepValueOnLoading =
    this.config?.keepValueOnLoading ?? false;
  /**
   * @description
   * A flag to control if the view should be created lazily or not.
   * Lazy does mean that no change detection will be triggered until the value source emits a value.
   *
   * Default: false
   */
  @Input() rxObserveLazyViewCreation = this.config?.lazyViewCreation ?? false;

  private subscription = new Subscription();
  private embeddedView!: EmbeddedViewRef<ObserveDirectiveContext<T>>;

  private context: ObserveDirectiveContext<T> = {
    $implicit: {} as T,
    observe: {} as T,
    error: undefined,
    completed: false,
    loading: false,
    renderCount: 0,
  };

  readonly renderStrategy$ = this.renderStrategy$$
    .asObservable()
    .pipe(distinctUntilChanged(), mergeAll(), distinctUntilChanged());
  readonly isViewPortStrategy$ = this.renderStrategy$.pipe(
    map((strategy) => strategy.type === 'viewport')
  );
  readonly renderStrategyOperator$ = setupOperator$(this.renderStrategy$);
  readonly source$ = this.source$$.pipe(distinctUntilChanged());

  /**
   * todo
   * when viewport strategy is used and before throttle or debounce was applied, they
   * are somehow combined.
   *
   * when switching to/from viewPort strategy emit a signal and end respective observables
   */
  viewPortObserver$: Observable<IntersectionObserverEntry[] | null> =
    this.renderStrategy$.pipe(
      switchMap((strategy) => {
        if (isViewportRenderStrategy(strategy)) {
          if (!supportsIntersectionObserver()) {
            return of(null);
          }
          return createIntersectionObserver(
            this.viewContainerRef.element.nativeElement.parentElement,
            {
              threshold: strategy.threshold,
              rootMargin: strategy.rootMargin,
              root: strategy.root,
            }
          );
          /*     .pipe(
            takeUntil(this.renderStrategy$$.pipe(skip(1)))
          )*/
        }

        return of(null);
      })
    );
  visible$ = this.viewPortObserver$.pipe(
    map((entries) => entries?.some((entry) => entry.isIntersecting))
  );

  readonly sourceWithOperator$ = this.renderStrategyOperator$.pipe(
    withLatestFrom(this.source$),
    /**
     * unsubscribe from previous source and subscribe to new source
     * apply operator from renderStrategy.
     *
     * when unsubscribe from previous source, the last value will be lost.
     * We can fix this by providing context also via observable and
     * withLatestFrom it here.
     */
    switchMap(([o, source$]) => {
      return source$.pipe(
        //@ts-ignore
        o
        //takeUntil(this.renderStrategy$$.pipe(skip(1)))
      );
    })
  );
  static ngTemplateGuard_rxObserve: 'binding';
  static ngTemplateContextGuard<T>(
    directive: RxObserveDirective<T>,
    context: unknown
  ): context is ObserveDirectiveContext<T> {
    return true;
  }

  ngOnInit(): void {
    if (!this.embeddedView) {
      this.createEmbeddedView();
    }

    // todo refactor into smaller chunks
    this.subscription.add(
      this.refreshEffect$$
        .pipe(
          distinctUntilChanged(),
          mergeAll(),
          withLatestFrom(this.loadingTemplate$$.pipe(startWith(null)))
        )
        .subscribe(([_, loadingTemplate]) => {
          this.context.loading = true;
          if (!this.rxObserveKeepValueOnLoading) {
            this.viewContainerRef.clear();
          }

          if (this.config?.loadingComponent) {
            this.viewContainerRef.createComponent(
              this.config.loadingComponent,
              {
                injector: this.createInjector(),
              }
            );
          } else {
            this.embeddedView = this.viewContainerRef.createEmbeddedView(
              loadingTemplate || this.templateRef,
              this.context
            );
          }

          this.embeddedView.detectChanges();
          this.renderCallback$$?.next({
            renderCycle: 'before-next',
            value: this.context.$implicit,
            error: this.context.error,
          });
        })
    );

    // todo refactor into smaller chunks
    this.subscription.add(this.sourceWithOperator$
      .pipe(
        distinctUntilChanged(),
        filter((v) => v !== undefined),
        combineLatestWith(this.visible$)
      )
      .subscribe({
        next: (val) => {
          const v = val[0] as T;
          const visible = val[1] ?? true;
          /**
           * only update the view if the value has changed and the view is visible
           */
          if (visible && v !== this.context.$implicit) {
            if (v) {
              this.context.$implicit = v;
              this.context.observe = v;
            }

            this.context.loading = false;
            this.context.renderCount++;

            this.viewContainerRef.clear();
            this.embeddedView = this.viewContainerRef.createEmbeddedView(
              this.templateRef,
              this.context
            );

            this.embeddedView.detectChanges();
            this.renderCallback$$?.next({
              renderCycle: 'next',
              value: this.context.$implicit,
              error: this.context.error,
            });
          }
        },
        error: (err) => {
          this.context.error = err;
          this.viewContainerRef.clear();
          if (this.config?.errorComponent) {
            this.viewContainerRef.createComponent(this.config.errorComponent, {
              injector: this.createInjector(),
            });
          } else {
            this.embeddedView = this.viewContainerRef.createEmbeddedView(
              this.rxObserveErrorTemplate || this.templateRef,
              this.context
            );
          }

          this.embeddedView.detectChanges();
          this.renderCallback$$?.next({
            renderCycle: 'error',
            value: this.context.$implicit,
            error: this.context.error,
          });
        },
        complete: () => {
          this.context.completed = true;
          this.viewContainerRef.clear();
          if (this.config?.completeComponent) {
            this.viewContainerRef.createComponent(
              this.config.completeComponent,
              {
                injector: this.createInjector(),
              }
            );
          } else {
            this.embeddedView = this.viewContainerRef.createEmbeddedView(
              this.rxObserveCompleteTemplate || this.templateRef,
              this.context
            );
          }

          this.embeddedView.detectChanges();
          this.renderCallback$$?.next({
            renderCycle: 'complete',
            value: this.context.$implicit,
            error: this.context.error,
          });
        },
      }));
  }

  private createInjector() {
    return Injector.create({
      providers: [
        {
          provide: RX_OBSERVE_DIRECTIVE_CONTEXT,
          useValue: this.context,
        },
      ],
    });
  }

  ngOnDestroy(): void {
    this.viewContainerRef.clear();
    if (this.embeddedView) {
      this.embeddedView.destroy();
    }
    this.subscription.unsubscribe();
  }

  private createEmbeddedView(): void {
    this.embeddedView = this.viewContainerRef.createEmbeddedView(
      this.templateRef,
      this.context
    );
    if (!this.rxObserveLazyViewCreation) {
      this.embeddedView.detectChanges();
    }
    if (this.detach) {
      this.embeddedView.detach();
    }
  }
}
