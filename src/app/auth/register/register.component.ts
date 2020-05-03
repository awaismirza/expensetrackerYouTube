import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{

  private registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.min(8), Validators.required]),
    confirmPassword: new FormControl('', [Validators.min(8), Validators.required])
  });

  constructor(
      private authService: AuthService
  ) {
  }

  doRegister(): void {
    this.authService.registerWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
        .subscribe({
          next: (res) => {
            console.log(res)
          }
        })
  }

  ngOnInit(): void {
  }

  checkFieldValidity(control: string): void {
    const cont = this.registerForm.controls[control]
    console.log(cont)
  }
}
