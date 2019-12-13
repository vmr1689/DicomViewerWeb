import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageComponent } from './image/image.component';
import { SegmentsComponent } from './segments/segments.component';

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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewersRoutingModule { }
