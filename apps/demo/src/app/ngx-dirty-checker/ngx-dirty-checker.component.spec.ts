import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDirtyCheckerComponent } from './ngx-dirty-checker.component';

describe('NgxDirtyCheckerComponent', () => {
  let component: NgxDirtyCheckerComponent;
  let fixture: ComponentFixture<NgxDirtyCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDirtyCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDirtyCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
