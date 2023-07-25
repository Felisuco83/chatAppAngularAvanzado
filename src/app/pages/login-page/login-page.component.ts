import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  loginError: string;

  ngOnInit(): void { }

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(
        (e) => {
          console.log(e.message);
          if (e.message.includes("user-not-found")) {
            this.loginError = "Usuario no encontrado";
          } else if (e.message.includes('wrong-password')) {
            this.loginError = "Password inválido";
          } else {
            this.loginError = "Error desconocido";
          }
        }
      );
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));
  }
}