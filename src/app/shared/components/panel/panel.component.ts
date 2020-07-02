import {Component} from '@angular/core';
import {LABELS} from '../../constants/labels-constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

  public labels = LABELS.DASHBOARD;

  public showModal(): void {
    Swal.fire({
      title: this.labels.COMING_SOON,
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: 'OK'
    });
  }

}
