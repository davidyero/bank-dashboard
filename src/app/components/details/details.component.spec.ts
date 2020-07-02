import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {DetailsComponent} from './details.component';
import {CUSTOM_ELEMENTS_SCHEMA, Injectable} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ALL_PRODUCTS} from '../../shared/mocks/all-products.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {CONSTANTS} from '../../shared/constants/constants';

@Injectable()
export class DummyProvider {
  constructor() {}
}

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let productService: ProductService;
  let injector: TestBed;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: CONSTANTS.ROUTES.DASHBOARD, component: DummyProvider}
      ])],
      declarations: [DetailsComponent],
      providers: [ProductService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    productService = injector.get(ProductService);
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture = null;
    component = null;
    injector = null;
    productService = null;
  });

  describe('When ngOnInit is invoked', () => {
    it('should fill product and productData', () => {
      spyOn(productService, 'getProduct').and.returnValue(ALL_PRODUCTS[0]);
      spyOn(productService, 'getProductInfoDetail').and.returnValue({
        iconName: 'string',
        productName: 'string',
        titleBalance: 'string',
        balance: 'string',
        productId: 'string',
        titleFooter: 'string',
        informationFooter: 'string',
      });

      component.ngOnInit();

      expect(component.product).not.toBeNull();
      expect(component.productInfo).not.toBeNull();
    });
  });

  describe('When getDate is invoked', () => {
    it('should return formated date', () => {

      const date = component.getDate('2020-08-20T00:00:00');

      expect(date).toBe('20-08-2020');
    });
  });
});
