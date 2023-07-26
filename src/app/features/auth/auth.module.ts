import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LoginPageComponent } from '../../pages/login-page/login-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegisterPageComponent } from 'src/app/pages/register-page/register-page.component';
import { RegisterFormComponent } from 'src/app/components/register-form/register-form/register-form.component';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent, RegisterFormComponent, RegisterPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class AuthModule { }