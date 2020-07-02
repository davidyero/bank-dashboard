import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ProductModel} from '../../shared/models/product.model';
import {finalize} from 'rxjs/operators';
import {LABELS} from '../../shared/constants/labels-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public username = sessionStorage.getItem('username');
  public labels = LABELS.DASHBOARD;
  public productList: ProductModel[] = [];
  public isLoading = false;
  public productsOrder = {DEPOSIT_ACCOUNT: 1, CREDIT_CARD: 2, CURRENT_ACCOUNT: 3, CREDIT: 4, CERTIFIED_DEPOSIT_TERM: 5};
  public showAllBanks = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    this.isLoading = true;
    this.productService.getAllProducts()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (products: ProductModel[]) => {
          products.sort((a, b) => this.productsOrder[a.typeAccount] - this.productsOrder[b.typeAccount]);
          products.forEach(product => {
            product.isFirst = !Boolean(this.productList.find(prod => prod.typeAccount === product.typeAccount));
            this.productList.push(product);
          });
        }
      );
  }
}
