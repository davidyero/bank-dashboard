import { Injectable } from '@angular/core';
import {ProductModel} from '../models/product.model';
import {ALL_PRODUCTS} from '../mocks/all-products.mock';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {ProductInfoDetailModel} from '../models/product-info-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private selectedProduct: ProductModel;
  private selectedProductInfoDetailModel: ProductInfoDetailModel;

  constructor() { }

  setProduct(selectedProduct: ProductModel): void {
    this.selectedProduct = selectedProduct;
  }

  getProduct(): ProductModel {
    return this.selectedProduct;
  }

  setProductInfoDetail(selectedProductInfoDetailModel: ProductInfoDetailModel): void {
    this.selectedProductInfoDetailModel = selectedProductInfoDetailModel;
  }

  getProductInfoDetail(): ProductInfoDetailModel {
    return this.selectedProductInfoDetailModel;
  }

  public getAllProducts(): Observable<ProductModel[]> {
    return of(ALL_PRODUCTS).pipe(delay(2000));
  }
}
