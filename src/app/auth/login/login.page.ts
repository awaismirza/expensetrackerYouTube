import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {AnimationController} from '@ionic/angular';
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

	private showPassword: boolean = false;
	private loginForm: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.min(8)])
	});

	constructor(
		private authService: AuthService,
		private animationCtrl: AnimationController,
	) {
		Plugins.Keyboard.setResizeMode({mode: KeyboardResize.None});
		Plugins.Keyboard.addListener('keyboardWillHide', () => {
			this.performAnimation(false);
		})

		Plugins.Keyboard.removeAllListeners()
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
	}

	performAnimation(up: boolean): void {
		if (up === true) {
			this.loginCardAnimation = this.animationCtrl.create()
				.addElement(document.querySelector('#loginFormCard'))
				.duration(200)
				.fromTo('transform', 'translateY(0px)', 'translateY(-150px)').play()
		} else {
			this.loginCardAnimation = this.animationCtrl.create()
				.addElement(document.querySelector('#loginFormCard'))
				.duration(200)
				.fromTo('transform', 'translateY(0px)', 'translateY(150px)').play()
		}


	}
}
