import {Component, OnInit} from '@angular/core';
import {combineLatest, map, Observable, of, Subject} from 'rxjs';

interface KK {
  id: number;
  name: string;
}
interface TeilnehmerListComponentState {
  chips: string[];
  kk: KK[];
  loading: boolean;
  pageSize: number;
  pageIndex: number;
  totalElements: number;
}
type TeilnehmerListViewModel = TeilnehmerListComponentState & {
  hasFilter: boolean;
};

@Component({
  selector: 'demo-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  chips$$ = new Subject<string[]>();
  pageIndex$$ = new Subject<number>();
  /*  vm1$: Observable<TeilnehmerListComponentState> = of({
    chips: [],
    kk: [],
    loading: true,
    pageIndex: 0,
    pageSize: 0,
    totalElements: 0,
  });*/

  // @ts-ignore

  vm1$: Observable<TeilnehmerListComponentState> = combineLatest([
    of({
      chips: [],
      kk: [],
      loading: true,
      pageIndex: 0,
      pageSize: 0,
      totalElements: 0,
    }),
    this.chips$$,
    this.pageIndex$$,
  ]).pipe(
    map(([init, chips, pageIndex]) => ({
      chips,
      pageIndex,
      // @ts-ignore
      pageSize: init.pageSize,
      // @ts-ignore
      loading: init.loading,
      // @ts-ignore
      totalElements: init.totalElements,
      // @ts-ignore
      kk: init.kk,
    }))
  );

  vm2$: Observable<TeilnehmerListViewModel> = of({
    chips: [],
    kk: [],
    loading: false,
    pageIndex: 0,
    pageSize: 0,
    totalElements: 0,
    hasFilter: true,
  });

  constructor() {}

  ngOnInit(): void {}

  protected readonly Math = Math;

  chips() {
    this.chips$$.next([`${Math.random()}`]);
  }
}
