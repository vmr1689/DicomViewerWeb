import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { UtilityModule } from './shared/utilities';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './layout/layout.module';
import { ViewerModule } from './viewer/viewers.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    UtilityModule.forRoot(),
    AuthModule,
    LayoutModule,
    ViewerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
