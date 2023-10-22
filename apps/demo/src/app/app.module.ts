import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {L1Component} from "./stream-vs-async/l1.component";
import {L1StreamComponent} from "./stream-vs-async/l1-stream.component";
import {AsyncPipe} from "@angular/common";
import {L1Component as L1Nested, L2Component as L2Nested} from "./stream-vs-async/nested-stream-directive.components";
import {RxObserveDirective, RxObserveDirectiveModule} from "@angular-kit/rx-observe";
import {L2StreamComponent} from "./stream-vs-async/l2-stream.component";
import {StreamVsAsyncComponent} from "./stream-vs-async/stream-vs-async.component";
import {L2Component} from "./stream-vs-async/l2.component";
import { NgxDirtyCheckerComponent } from './ngx-dirty-checker/ngx-dirty-checker.component';

@NgModule({
  declarations: [
    AppComponent,
    L1Component,
    L2Component,
    L1StreamComponent,
    L2StreamComponent,
    L2Nested,
    L1Nested,
    StreamVsAsyncComponent,
    NgxDirtyCheckerComponent,

    ],
  imports: [BrowserModule,  RxObserveDirectiveModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
