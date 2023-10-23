import { InjectionToken, Provider, Type } from '@angular/core';
import { ObserveDirectiveContext } from './types/observe-directive-context';
import { RenderStrategies } from './types/render-strategies';

export interface RxObserveDirectiveConfig {
  loadingComponent?: Type<any>;
  errorComponent?: Type<any>;
  completeComponent?: Type<any>;
  keepValueOnLoading?: boolean;
  lazyViewCreation?: boolean;
  renderStrategy?: RenderStrategies;
}

export const RX_OBSERVE_DIRECTIVE_CONFIG =
  new InjectionToken<RxObserveDirectiveConfig>('RX_OBSERVE_DIRECTIVE_CONFIG');

// todo fix any
export const RX_OBSERVE_DIRECTIVE_CONTEXT = new InjectionToken<
  ObserveDirectiveContext<any>
>('OBSERVE_DIRECTIVE_CONTEXT');

export function provideRxObserveDirectiveConfig(
  config: RxObserveDirectiveConfig
): Provider {
  return { provide: RX_OBSERVE_DIRECTIVE_CONFIG, useValue: config };
}

export function provideRxObserveDirectiveContext<T>(
  context: ObserveDirectiveContext<T>
): Provider {
  return { provide: RX_OBSERVE_DIRECTIVE_CONTEXT, useValue: context };
}
