import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewersRoutingModule } from './viewers-routing.module';

import { ImageComponent } from './image/image.component';

import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SegmentsComponent } from './segments/segments.component';
import { RgsegmentsComponent } from './rgsegments/rgsegments.component';


@NgModule({
  declarations: [ImageComponent, SegmentsComponent, RgsegmentsComponent],
  imports: [
    CommonModule,
    ViewersRoutingModule,
    FormsModule,
    NgbModule,
  ],
  exports: [ImageComponent],
  bootstrap: [ImageComponent]
})
export class ViewerModule { }
