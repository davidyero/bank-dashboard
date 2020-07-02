import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {CUSTOM_ELEMENTS_SCHEMA, Injectable} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {CONSTANTS} from '../../shared/constants/constants';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {throwError} from 'rxjs';

@Injectable()
export class DummyProvider {
  constructor() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let userService: UserService;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: CONSTANTS.ROUTES.DASHBOARD, component: DummyProvider}
      ]), FormsModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [UserService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = injector.get(Router);
    userService = injector.get(UserService);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture = null;
    component = null;
    injector = null;
    router = null;
  });

  describe('When ngOnInit is invoked', () => {
    it('should navigate to dashboard', () => {
      sessionStorage.setItem('username', 'Julian');

      component.ngOnInit();

      expect(router.navigate).toHaveBeenCalledWith([CONSTANTS.ROUTES.DASHBOARD]);
    });
  });

  describe('When onSubmit is invoked', () => {
    it('should call userService and set value in sessionStorage', () => {
      component.loginFormGroup.controls.username.setValue('Julian');
      component.loginFormGroup.controls.password.setValue('123456');
      component.onSubmit();

      expect(sessionStorage.getItem('username')).toBe('Julian');
    });

    it('should show error message', () => {
      spyOn(userService, 'login').and.returnValue(throwError({
        status: 404
      }));
      component.loginFormGroup.controls.username.setValue('Julian');
      component.loginFormGroup.controls.password.setValue('123456');
      component.onSubmit();

      expect(component.showErrorMessage).toBeTruthy();
    });

    it('should hidden loading', () => {
      spyOn(userService, 'login').and.returnValue(throwError({
        status: 500
      }));
      component.loginFormGroup.controls.username.setValue('Julian');
      component.loginFormGroup.controls.password.setValue('123456');
      component.onSubmit();

      expect(component.isLoading).toBeFalsy();
    });
  });

});
