import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {AnimationController} from '@ionic/angular';


@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	private showPassword: boolean = false;

	private loginForm: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.min(8)])
	});

	constructor(
		private authService: AuthService,
		private animationCtrl: AnimationController
	) {
	}

	doLogin(): void {
		this.authService.loginWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
			.subscribe({
				next: (res) => console.log(res),
				error: (err) => console.error(err)
			})
	}

	togglePasswordFieldType(): void {
		this.showPassword = !this.showPassword;
	}

	ngOnInit(): void {
		console.log(this.authService);
		// this.transformAnimation()
	}

	transformAnimation(e: any): void {
		this.animationCtrl.create()
			.addElement(e)
			.duration(1500)
			.iterations(Infinity)
			.fromTo('transform', 'translateX(0px)', 'translateX(100px)')
			.fromTo('opacity', '1', '0.2');
	}
}
