import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {CardComponent} from './card.component';
import {CUSTOM_ELEMENTS_SCHEMA, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ALL_PRODUCTS} from '../../mocks/all-products.mock';
import {CONSTANTS} from '../../constants/constants';

@Injectable()
export class DummyProvider {
  constructor() {}
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let productService: ProductService;
  let router: Router;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: CONSTANTS.ROUTES.DASHBOARD, component: DummyProvider}
      ])],
      declarations: [CardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    productService = injector.get(ProductService);
    router = injector.get(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture = null;
    component = null;
    injector = null;
    productService = null;
    router = null;
  });

  describe('When ngOnInit is invoked', () => {
    it('should assign value to constants - CDT', () => {
      component.product = ALL_PRODUCTS[0];
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.productName).not.toBeNull();
      expect(component.titleBalance).not.toBeNull();
    });

    it('should assign value to constants - CREDIT', () => {
      component.product = ALL_PRODUCTS[4];
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.productName).not.toBeNull();
      expect(component.titleBalance).not.toBeNull();
    });

    it('should assign value to constants - CREDIT_CARD', () => {
      component.product = ALL_PRODUCTS[5];
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.productName).not.toBeNull();
      expect(component.titleBalance).not.toBeNull();
    });

    it('should assign value to constants - CREDIT_CARD', () => {
      component.product = ALL_PRODUCTS[7];
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.productName).not.toBeNull();
      expect(component.titleBalance).not.toBeNull();
    });

    it('should assign value to constants - CURRENT_ACCOUNT', () => {
      component.product = ALL_PRODUCTS[8];
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.productName).not.toBeNull();
      expect(component.titleBalance).not.toBeNull();
    });

    it('should assign value to constants - DEPOSIT_ACCOUNT', () => {
      component.product = ALL_PRODUCTS[9];
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.productName).not.toBeNull();
      expect(component.titleBalance).not.toBeNull();
    });
  });

  describe('When viewDetails is invoked', () => {
    it('should navigate to details', () => {
      component.viewDetails();

      expect(router.navigate).toHaveBeenCalledWith([CONSTANTS.ROUTES.DETAILS]);
    });
  });
});
