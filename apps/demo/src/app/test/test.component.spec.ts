import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TestComponent } from './test.component';
import { CommonModule } from '@angular/common';
import { RxObserveDirective } from '@angular-kit/rx-observe';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('TestCompo', () => {
  it('should create', async () => {
    const { component } = await create();

    expect(component).toBeDefined();
  });

  it('should bla', fakeAsync(async () => {
    const { component } = await create();

    const result = subscribeSpyTo(component.vm1$);

    component.pageIndex$$.next(1);
    component.pageIndex$$.next(2);
    component.chips$$.next(['a']);
    tick(1);

    expect(result.getValues().length).toEqual(1);
  }));
});

async function create() {
  await TestBed.configureTestingModule({
    declarations: [TestComponent],
    imports: [CommonModule, RxObserveDirective],
  }).compileComponents();

  return {
    component: TestBed.createComponent(TestComponent).componentInstance,
  };
}
