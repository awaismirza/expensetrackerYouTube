import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {LoginPageRoutingModule} from './login-routing.module';
import {LoginPage} from './login.page';
import {AppFormsModule} from '../../core/modules/app-forms.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        LoginPageRoutingModule,
        AppFormsModule,
    ],
    declarations: [LoginPage]
})
export class LoginPageModule {
}
