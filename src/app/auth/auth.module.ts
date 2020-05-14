import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './services/auth/auth.service';
import {AuthComponent} from './auth.component';
import {IonicModule} from '@ionic/angular';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './guards/auth/auth.guard';


@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        IonicModule,
        AngularFireAuthModule,
    ],
    providers: [
        AngularFireAuth,
    ],
})
export class AuthModule {
}
