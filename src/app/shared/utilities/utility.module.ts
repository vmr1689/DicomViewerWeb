import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SpinnerComponent
    ],
    exports: [
        SpinnerComponent
    ],
    entryComponents: [
        SpinnerComponent
    ]
})
export class UtilityModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UtilityModule,
            providers: [
                SpinnerService,
            ]
        };
    }
}
