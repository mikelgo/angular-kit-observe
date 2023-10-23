import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

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
  vm1$: Observable<TeilnehmerListComponentState> = of({
    chips: [],
    kk: [],
    loading: true,
    pageIndex: 0,
    pageSize: 0,
    totalElements: 0,
  });

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
}
