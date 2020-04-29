import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

    private forgotPasswordForm: FormGroup = new FormGroup({
        email: new FormControl('', Validators.email)
    });

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    onSubmit(): void {
        console.log('Submitting Reset Password Request');
        console.log(this.forgotPasswordForm.value);
    }

    navigateToLogin(): void {
        this.router.navigateByUrl('auth/login');
    }

    navigateToRegister(): void {
        this.router.navigateByUrl('auth/register');
    }
}
