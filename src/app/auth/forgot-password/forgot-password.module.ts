import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ForgotPasswordRoutingModule} from './forgot-password-routing.module';
import {ForgotPasswordComponent} from './forgot-password.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [
        CommonModule,
        IonicModule,
        ForgotPasswordRoutingModule
    ]
})
export class ForgotPasswordModule {
}
