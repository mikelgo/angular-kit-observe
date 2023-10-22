/**
 * @description
 * Context for the *stream-directive.
 */
export interface ObserveDirectiveContext<T> {
  $implicit: T ;
  observe: T ;
  error: any;
  completed: boolean;
  loading: boolean;

  renderCount: number;
}
