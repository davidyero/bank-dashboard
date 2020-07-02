import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public validateLogin(): boolean {
    return Boolean(sessionStorage.getItem('username'));
  }
  public validateDetails(): boolean {
    console.log(window.location.pathname === '/details');
    return window.location.pathname === '/details';
  }
}
