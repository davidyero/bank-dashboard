import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public login(user: string, password: string): Observable<boolean> {
    const validation = user === 'Julian' && password === '123456';
    if (validation) {
      sessionStorage.setItem('username', user);
      return of(validation).pipe(delay(2000));
    } else {
      return throwError({
        status: 404
      });
    }
  }
}
