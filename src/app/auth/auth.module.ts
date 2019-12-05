import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from '../shared/services';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AuthRoutingModule,
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        AuthenticationService
    ]
})

export class AuthModule { }
