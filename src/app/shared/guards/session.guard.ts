import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {CONSTANTS} from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!Boolean(sessionStorage.getItem('username'))) {
      this.router.navigate([CONSTANTS.ROUTES.LOGIN]);
    }
    return true;
  }
}
