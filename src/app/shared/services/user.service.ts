import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public login(user: string, password: string): Observable<boolean> {
    const validation = Boolean(user) && password === '123456';
    if (validation) {
      sessionStorage.setItem('username', user);
      return of(validation);
    } else {
      return throwError({
        status: 404
      });
    }
  }
}
