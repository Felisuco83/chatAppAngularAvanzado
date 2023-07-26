import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { RegisterData } from 'src/app/interfaces/register-data.interface';
import { FireStoreServiceService } from 'src/app/services/firestore-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly fireStoreService: FireStoreServiceService
  ) { }

  registerError: string;

  ngOnInit(): void { }

  register(registerData: RegisterData) {
    this.authService
      .register({ email: registerData.email, password: registerData.password })
      .then((userCredential) => {
        this.authService
          .login({ email: registerData.email, password: registerData.password })
          .then(() => this.router.navigate(['/dashboard']))
        this.fireStoreService.create({ Id: userCredential.user.uid, UserName: registerData.fullName })
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