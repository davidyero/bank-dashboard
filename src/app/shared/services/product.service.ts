import { Injectable } from '@angular/core';
import {ProductModel} from '../models/product.model';
import {ALL_PRODUCTS} from '../mocks/all-products.mock';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  public getAllProducts(): Observable<ProductModel[]> {
    return of(ALL_PRODUCTS).pipe(delay(2000));
  }
}
