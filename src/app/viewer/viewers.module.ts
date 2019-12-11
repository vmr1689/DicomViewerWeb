import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewersRoutingModule } from './viewers-routing.module';

import { ImageComponent } from './image/image.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ImageComponent],
  imports: [
    CommonModule,
    ViewersRoutingModule,
    FormsModule
  ]
})
export class ViewerModule { }
