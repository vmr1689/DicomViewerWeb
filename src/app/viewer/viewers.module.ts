import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewersRoutingModule } from './viewers-routing.module';

import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [ImageComponent],
  imports: [
    CommonModule,
    ViewersRoutingModule
  ]
})
export class ViewerModule { }
