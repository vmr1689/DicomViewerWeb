import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';

import { PatientsComponent } from './patients/patients.component';
import { StudiesComponent } from './studies/studies.component';
import { SeriesComponent } from './series/series.component';

@NgModule({
  declarations: [ PatientsComponent, StudiesComponent, SeriesComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
