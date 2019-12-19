import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageComponent } from './image/image.component';
import { SegmentsComponent } from './segments/segments.component';
import { RgsegmentsComponent } from './rgsegments/rgsegments.component';
import { KmsegmentsComponent } from './kmsegments/kmsegments.component';

const routes: Routes = [
    {
        path: 'image',
        component: ImageComponent
    },
    {
        path: '',
        component: ImageComponent
    },
    {
        path: 'segments',
        component: SegmentsComponent
    },
    {
        path: 'rgsegments',
        component: RgsegmentsComponent
    },
    {
        path: 'kmsegments',
        component: KmsegmentsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewersRoutingModule { }
