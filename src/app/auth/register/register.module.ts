import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        IonicModule,
        RegisterRoutingModule
    ]
})
export class RegisterModule {
}
