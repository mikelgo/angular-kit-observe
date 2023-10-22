import {InjectionToken, Provider, Type} from '@angular/core';
import {ObserveDirectiveContext} from './types/observe-directive-context';
import {RenderStrategies} from "./types/render-strategies";

export interface ObserveDirectiveConfig {
  loadingComponent?: Type<any>;
  errorComponent?: Type<any>;
  completeComponent?: Type<any>;
  keepValueOnLoading?: boolean;
  lazyViewCreation?: boolean;
  renderStrategy?: RenderStrategies;
}

export const OBSERVE_DIRECTIVE_CONFIG = new InjectionToken<ObserveDirectiveConfig>('OBSERVE_DIRECTIVE_CONFIG');

// todo fix any
export const OBSERVE_DIRECTIVE_CONTEXT = new InjectionToken<ObserveDirectiveContext<any>>('OBSERVE_DIRECTIVE_CONTEXT');


export function provideObserveDirectiveConfig(config: ObserveDirectiveConfig): Provider {
  return {provide: OBSERVE_DIRECTIVE_CONFIG, useValue: config};
}

export function provideObserveDirectiveContext<T>(context: ObserveDirectiveContext<T>): Provider {
  return {provide: OBSERVE_DIRECTIVE_CONTEXT, useValue: context};
}
