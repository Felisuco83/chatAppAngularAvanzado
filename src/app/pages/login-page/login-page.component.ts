import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { FireStoreServiceService } from 'src/app/services/firestore-service.service';
import { UserCredential } from '@angular/fire/auth';
import { ACTION_SET_USERNAME } from 'src/app/store/actions/appActions';
import { UserData } from 'src/app/interfaces/user-data.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly reduxStore: StoreService,
    private readonly fireStoreService: FireStoreServiceService) { }

  loginError: string;
  user: any;

  ngOnInit(): void { }

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then((loginCredentials: UserCredential) => {
        const _this = this;
        this.fireStoreService.get(loginCredentials.user.uid).subscribe(res => {
          // console.log(res['UserName']);
          this.reduxStore.updateState({ type: ACTION_SET_USERNAME, payload: res['UserName'] });
          this.router.navigate(['/dashboard'])
        });
        // .pipe(map(({ res }) =>
        //   console.log('pipemap ---', res)))
        // .subscribe(res => console.log('subscribe---', res));

      })
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