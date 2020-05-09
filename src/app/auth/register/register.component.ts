import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators, ValidationErrors} from '@angular/forms';
import {AnimationService} from '../../services/animation/animation.service';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {AppRoutes} from '../../constants/constants';

// Authentication Forms Custom Validators
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return {passwordsNotMatching: true};
};

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    showPassword = false;

    private registerForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.min(8), Validators.required]),
        passwordConfirm: new FormControl('', [Validators.min(8), Validators.required, confirmPasswordValidator])
    });

    constructor(
        private animationService: AnimationService,
        private authService: AuthService,
        private router: Router,
    ) {}

    doRegister(): void {
        this.authService.registerWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
            .subscribe({
                next: (res) => {
                    if (res !== null) {
                        this.router.navigateByUrl(AppRoutes.LOGIN);
                    }
                }
            });
    }

    ngOnInit(): void {
    }

    togglePasswordFieldType(): void {
        this.showPassword = !this.showPassword;
    }

    checkFieldValidity(control: string): void {
        // const cont = this.registerForm.controls[control]
    }
}
