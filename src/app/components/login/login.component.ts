import { Component } from '@angular/core';
import {LABELS} from '../../shared/constants/labels-constants';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {CONSTANTS} from '../../shared/constants/constants';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public labels = LABELS.LOGIN;
  public loginFormGroup: FormGroup;
  public showErrorMessage = false;
  public isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginFormGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public onSubmit(): boolean {
    this.showErrorMessage = !this.loginFormGroup.valid;
    const user = this.loginFormGroup.controls.username.value;
    const password = this.loginFormGroup.controls.password.value;
    if (this.loginFormGroup.valid) {
      this.isLoading = true;
      this.userService.login(user, password)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          () => {
            this.router.navigate([CONSTANTS.ROUTES.DASHBOARD]);
          },
          (error: HttpErrorResponse) => {
            this.isLoading = false;
            if (error.status === CONSTANTS.ERROR_RESPONSE.NOT_FOUND) {
              this.showErrorMessage = true;
            } else {
              this.isLoading = true;
            }
          }
        );
    }
    return false;
  }
}
