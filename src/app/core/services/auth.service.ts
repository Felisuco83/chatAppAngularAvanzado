import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateEmail
} from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { LoginData } from '../../interfaces/login-data.interface';
import { FireStoreServiceService } from 'src/app/services/firestore-service.service';
import { ProfileData } from 'src/app/interfaces/profile-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private fireStoreService: FireStoreServiceService) { }

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  async updateUser(profileData: ProfileData) {
    let user = this.auth.currentUser;
    if (user) {
      await updateEmail(user, profileData.email);
      await updatePassword(user, profileData.newPassword);
      this.fireStoreService.update({ Id: user.uid, UserName: profileData.fullName });
    }
  }
}