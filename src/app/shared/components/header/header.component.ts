import { Component, OnInit } from '@angular/core';
import {CONSTANTS} from '../../constants/constants';
import {LABELS} from '../../constants/labels-constants';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public labels = LABELS.DASHBOARD;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  public logout(): void {
    Swal.fire({
      title: this.labels.LOGOUT.TITLE,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: this.labels.LOGOUT.BUTTON_CANCEL,
      confirmButtonColor: '#d33',
      confirmButtonText: this.labels.LOGOUT.BUTTON_CONFIRM
    }).then((result) => {
      if (result.value) {
        sessionStorage.removeItem('username');
        this.router.navigate([CONSTANTS.ROUTES.LOGIN]);
      }
    });
  }

  public showModal(): void {
    Swal.fire({
      title: this.labels.COMING_SOON,
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: 'OK'
    });
  }

  public goToDashboard(): void {
    this.router.navigate([CONSTANTS.ROUTES.DASHBOARD]);
  }
}
