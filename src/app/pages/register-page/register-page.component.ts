import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  registerError: string;

  ngOnInit(): void { }

  register(loginData: LoginData) {
    this.authService
      .register(loginData)
      .then(() => {
        // this.router.navigate(['/login']);
        this.authService
          .login(loginData)
          .then(() => this.router.navigate(['/dashboard']))
      })
      .catch((e) => {
        console.log(e.message);
        if (e.message.includes("weak-password")) {
          this.registerError = "El password debe tener al menos 6 caracteres";
        } else if (e.message.includes('already-in-use')) {
          this.registerError = "Ya existe un usuario registrado con ese email";
        } else {
          this.registerError = "Error desconocido";
        }
      });
  }
}