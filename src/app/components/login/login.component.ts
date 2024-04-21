import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginForm: FormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}


  login(): void {
    if (this.loginForm?.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .subscribe(
          response => {
            localStorage.setItem('accessToken', response.access_token);
            // Redirigir a la página de inicio, por ejemplo
            // this.router.navigate(['/home']);
          }
        );
    }
  }
}
