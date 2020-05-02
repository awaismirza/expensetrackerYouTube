import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

    private loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.min(8)])
    });

    constructor(
        private fireAuth: AngularFireAuth
    ) {}

    doLogin(): void {
        console.log(this.loginForm.value);
        const loginFormValues = this.loginForm.value;
        this.fireAuth.auth.signInWithEmailAndPassword(
            loginFormValues.email,
            loginFormValues.password
        ).then((res) => {
            console.log(res);
        })
    }

    ngOnInit(): void {
        console.log(this.fireAuth.auth.currentUser)
    }
}
