import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {
  signupForm: FormGroup;
  user : User = new User(NaN, '', '', '');

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.checkPasswords]]
    });
  }

   registerUser() {
    if (this.signupForm.valid) {
      this.user.name = this.signupForm.get('name')?.value;
      this.user.password = this.signupForm.get('password')?.value;
      this.user.email = this.signupForm.get('email')?.value;
      this.userService.signup(this.user).subscribe(
        response => {
          console.log('Usuario registrado correctamente:', response);
          // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
        }
      );
    }
  }


  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
  let pass = group.get('password')?.value;
  let confirmPass = group.get('confirmPassword')?.value

  return pass === confirmPass ? null : { notSame: true }
}
}
