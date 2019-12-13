import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewersRoutingModule } from './viewers-routing.module';

import { ImageComponent } from './image/image.component';

import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ImageComponent],
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
