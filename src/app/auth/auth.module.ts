import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ]
})
export class AuthModule {
}
