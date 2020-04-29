import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    navigateToLogin(): void {
        this.router.navigateByUrl('auth/login');
    }

    navigateToRegister(): void {
        this.router.navigateByUrl('auth/register');
    }
}
