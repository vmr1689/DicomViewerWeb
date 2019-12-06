import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';

import { PatientsComponent } from './patients/patients.component';
import { StudiesComponent } from './studies/studies.component';

@NgModule({
  declarations: [ PatientsComponent, StudiesComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
