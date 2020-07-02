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
    return window.location.pathname === '/details';
  }
}
