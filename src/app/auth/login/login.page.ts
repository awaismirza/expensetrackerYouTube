import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {KeyboardResize, Plugins} from '@capacitor/core';

const keyboard = Plugins.Keyboard;

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    @ViewChild('loginFormCard', {static: true}) loginCard: HTMLElement;

    private loginCardAnimation: any;

    private showPassword = false;

    private loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.min(8)])
    });

    constructor(
        private authService: AuthService,
    ) {
        Plugins.Keyboard.setResizeMode({mode: KeyboardResize.None});
        Plugins.Keyboard.addListener('keyboardWillShow', () => {
            // this.performAnimation(true);
        });

        // Plugins.Keyboard.addListener('keyboardDidHide', () => {
        //     this.performAnimation(false);
        // });
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

    // private performAnimation(up: boolean): void {
    //     if (up === true) {
    //         this.loginCardAnimation = this.animationCtrl.create()
    //             .addElement(document.querySelector('#loginFormCard'))
    //             .duration(500)
    //             .fromTo('transform', 'translateY(0px)', 'translateY(-60px)').play();
    //     } else {
    //         this.loginCardAnimation = this.animationCtrl.create()
    //             .addElement(document.querySelector('#loginFormCard'))
    //             .duration(500)
    //             .fromTo('transform', 'translateY(-60px)', 'translateY(60px)').play();
    //     }
    //
    //
    // }
}
