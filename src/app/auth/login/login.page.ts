import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    private loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.min(8)])
    });

    constructor() {}

    // Todo: Implement Login Functionality after Back-end Ready
    doLogin(): void {
        console.log(this.loginForm.value);
    }
}
