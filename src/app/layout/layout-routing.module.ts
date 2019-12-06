import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LayoutOutletComponent } from './layout-outlet/layout-outlet.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutOutletComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'patients',
                loadChildren: () => import('../patients/patients.module').then(m => m.PatientsModule)
            },
            {
                path: '',
                redirectTo: '/patients',
                pathMatch: 'full'
            }
        ],
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
