import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.min(8)])
    });

    constructor(private router: Router) {
    }

    // Todo: Implement Login Functionality after Back-end Ready
    doLogin(): void {
        console.log(this.loginForm.value);
    }

    ngOnInit() {
    }

    navigateToRegister(): void {
        this.router.navigateByUrl('auth/register');
    }

    navigateToForgotPassword(): void {
        this.router.navigateByUrl('auth/forgot-password');
    }
}
