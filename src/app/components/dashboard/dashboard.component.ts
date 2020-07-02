import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ProductModel} from '../../shared/models/product.model';
import {finalize} from 'rxjs/operators';
import {LABELS} from '../../shared/constants/labels-constants';
import {FormControl} from '@angular/forms';
import {CONSTANTS} from '../../shared/constants/constants';

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
  public banks = [];
  public formBanks = new FormControl();

  public readonly DEFAULT_BANK = 'BANCO_1';

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.createBankArray();
    this.initializeData();
  }

  public selectBank(): void {
    const selection = this.formBanks.value;
    if (selection.includes('ALL_BANKS')) {
      this.formBanks.setValue(Object.keys(CONSTANTS.BANKS));
    }
  }

  public validateProductBank(bank: string): boolean {
    return this.formBanks.value.includes(bank);
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

  private createBankArray(): void {
    this.banks = Object.keys(CONSTANTS.BANKS).map((key) => {
      return [key, CONSTANTS.BANKS[key]];
    });
    this.formBanks.setValue([this.DEFAULT_BANK]);
  }
}
