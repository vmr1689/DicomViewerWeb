import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsComponent } from './patients/patients.component';
import { StudiesComponent } from './studies/studies.component';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
    {
        path: 'patients',
        component: PatientsComponent
    },
    {
        path: 'studies',
        component: StudiesComponent
    },
    {
        path: 'series',
        component: SeriesComponent
    },
    {
        path: '',
        component: PatientsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientsRoutingModule { }
