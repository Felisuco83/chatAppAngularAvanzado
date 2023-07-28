import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Redux imports
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { Rootreducer } from './store/reducers/rootReducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page/profile-page.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    StoreModule.forRoot(Rootreducer, {}),
    StoreDevtoolsModule.instrument({ maxAge: 20 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
