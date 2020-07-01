import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SessionGuard} from './shared/guards/session.guard';
import {CONSTANTS} from './shared/constants/constants';

const routes: Routes = [
  {
    path: CONSTANTS.ROUTES.LOGIN,
    component: LoginComponent
  },
  {
    path: CONSTANTS.ROUTES.DASHBOARD,
    component: DashboardComponent,
    canActivate: [SessionGuard]
  },
  {
    path: '',
    redirectTo: CONSTANTS.ROUTES.LOGIN,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SessionGuard]
})
export class AppRoutingModule { }
