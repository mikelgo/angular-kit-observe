import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {scan} from 'rxjs/operators';


@Component({
    selector: 'angular-kit-stream-vs-async',
    template: `
    <div class="comp-container">
      <div>
        <ngx-dirty-checker></ngx-dirty-checker>
        <button (click)="value$$.next(1)">update value</button>
      </div>
      <br />
      <div class="resizable">
        Push off viewport
      </div>
      <div class="demo-container">

        <div>
          <h3>Async-Pipe</h3>
          <div>
            <angular-kit-l1 [value]="value$ | async"></angular-kit-l1>
          </div>
        </div>
        <div>
          <h3>Stream-directive</h3>
          <div>
            <angular-kit-l1-stream [value]="value$"></angular-kit-l1-stream>
          </div>
        </div>
        <div>
          <h3>Nested Stream-directive</h3>
          <div>
            <l1-nested-stream *rxObserve="value$; let value" [value]="value"></l1-nested-stream>
          </div>
        </div>
      </div>
    </div>
  `,
    styleUrls: ['./stream-vs-async.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class StreamVsAsyncComponent {
  value$$ = new Subject<number>();
  value$ = this.value$$.pipe(scan((acc, value) => acc + 1, 0));
}
