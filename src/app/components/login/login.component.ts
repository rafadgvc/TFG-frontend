import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  /* Logs in with the form data */
  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .subscribe(
          () => {

            this.authService.updateAuthStatus(true);
            this.router.navigate(['/home']);
            this.snackbarService.showSuccess('Inicio de sesión exitoso');
          },
          error => {
            this.snackbarService.showError('Error en el inicio de sesión');
          }
        );
    }
  }

  /* Navigate to signup component */
  signUp(): void {
      this.router.navigate(['/signup']);
  }
}
