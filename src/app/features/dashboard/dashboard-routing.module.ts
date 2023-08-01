import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomePageComponent } from 'src/app/pages/home-page/home-page/home-page.component';
import { ProfilePageComponent } from 'src/app/pages/profile-page/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'profile', component: ProfilePageComponent },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      }
      // Add more child routes as needed
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
