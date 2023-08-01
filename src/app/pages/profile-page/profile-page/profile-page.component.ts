import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';
import { ProfileData } from 'src/app/interfaces/profile-data.interface';
import { FireStoreServiceService } from 'src/app/services/firestore-service.service';
import { StoreService } from 'src/app/services/store.service';
import { ACTION_SET_USERNAME } from 'src/app/store/actions/appActions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly reduxStore: StoreService,
    private readonly fireStoreService: FireStoreServiceService) { }

  profileError: string;
  user: any;

  ngOnInit(): void { }

  async editProfile(profileData: ProfileData) {
    await this.authService.updateUser(profileData);
    this.reduxStore.updateState({ type: ACTION_SET_USERNAME, payload: profileData.fullName });
  }

}
