import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutOutletComponent } from './layout-outlet/layout-outlet.component';

export const CONTAINERS = [
  HeaderComponent,
  FooterComponent,
  NavigationComponent,
  LayoutOutletComponent
];


@NgModule({
  declarations: [CONTAINERS, FooterComponent, HeaderComponent, LayoutOutletComponent, NavigationComponent],
  exports: [CONTAINERS],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
