import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {KeyboardResize, Plugins} from '@capacitor/core';
import {Router} from '@angular/router';
import {AppRoutes} from '../../constants/constants';
import {forkJoin, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    @ViewChild('loginFormCard', {static: true}) loginCard: HTMLElement;

    private loginCardAnimation: any;

    showPassword = false;

    private loginForm: FormGroup = new FormGroup({
        email: new FormControl('test1@gmail.com', [Validators.required, Validators.email]),
        password: new FormControl('hello123', [Validators.required, Validators.min(8)])
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private fireAuth: AngularFireAuth,
    ) {
        Plugins.Device.getInfo().then((deviceInfo) => {
            if (deviceInfo.platform !== 'web') {
                Plugins.Keyboard.setResizeMode({mode: KeyboardResize.None});
                Plugins.Keyboard.addListener('keyboardWillShow', () => {
                    console.log('Keyboard Event');
                });
            }
        });

    }

    doLogin(): void {
        this.authService.loginWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
            .then(() => {
                return this.router.navigateByUrl(AppRoutes.TABS);
                // return this.router.navigateByUrl(AppRoutes.TABS);
            })
            .then((bool) => {
                bool ? console.log('Successfully Logged In') : console.log('Login Failed');
            }).catch(err => console.log(err));
    }

    togglePasswordFieldType(): void {
        this.showPassword = !this.showPassword;
    }

    ngOnInit(): void {
        console.log(this.fireAuth.auth.currentUser);
    }
}
