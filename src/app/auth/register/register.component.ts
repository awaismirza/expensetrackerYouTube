import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.min(8), Validators.required]),
    confirmPassword: new FormControl('', [Validators.min(8), Validators.required])
  });

  constructor(private router: Router) {
  }

  doRegister(): void {
    console.log('Registering User');
  }

  ngOnInit() {
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('auth/login');
  }
}
