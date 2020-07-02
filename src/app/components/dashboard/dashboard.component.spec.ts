import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {CUSTOM_ELEMENTS_SCHEMA, Injectable} from '@angular/core';
import {CONSTANTS} from '../../shared/constants/constants';
import {RouterTestingModule} from '@angular/router/testing';

@Injectable()
export class DummyProvider {
  constructor() {}
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: CONSTANTS.ROUTES.DASHBOARD, component: DummyProvider}
      ])],
      declarations: [DashboardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture = null;
    component = null;
  });

  describe('When selectBank is invoked', () => {
    it('should formBank contain data', () => {

      component.selectBank();

      expect(component.formBanks.value).not.toBeNull();
    });

    it('should select all banks', () => {
      component.formBanks.setValue(['ALL_BANKS']);
      component.selectBank();

      expect(component.formBanks.value.length).toBe(Object.keys(CONSTANTS.BANKS).length);
    });
  });

  describe('When validateProductBank is invoked', () => {
    it('should validate selected bank', () => {

      const validation = component.validateProductBank('BANCO_1');

      expect(validation).toBeTruthy();
    });
  });

  xdescribe('When ngOnInit is invoked', () => {
    it('should productList fill data', () => {

      component.ngOnInit();

      expect(component.productList.length > 0).toBeTruthy();
    });
  });

});
