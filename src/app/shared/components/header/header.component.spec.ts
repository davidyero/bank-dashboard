import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {ALL_PRODUCTS} from '../../mocks/all-products.mock';
import {RouterTestingModule} from '@angular/router/testing';
import Swal from 'sweetalert2';
import {CONSTANTS} from '../../constants/constants';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HeaderComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = injector.get(Router);
    spyOn(router, 'navigate');
    spyOn(Swal, 'fire');
  });

  afterAll(() => {
    fixture = null;
    component = null;
    injector = null;
    router = null;
  });

  describe('When goToDashboard is invoked', () => {
    it('Should go To Dashboard', () => {
      component.goToDashboard();

      expect(router.navigate).toHaveBeenCalledWith([CONSTANTS.ROUTES.DASHBOARD]);
    });
  });

  describe('When showModal is invoked', () => {
    it('Should showModal', () => {
      component.showModal();

      expect(Swal.fire).toHaveBeenCalled();
    });
  });
});
