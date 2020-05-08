import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {KeyboardResize, Plugins} from '@capacitor/core';

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
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.min(8)])
    });

    constructor(
        private authService: AuthService,
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
            .subscribe({
                next: (res) => {
                    console.log(res);
                },
                error: (err) => {
                    console.error(err);
                }
            });
    }

    togglePasswordFieldType(): void {
        this.showPassword = !this.showPassword;
    }

    ngOnInit(): void {
    }
}
