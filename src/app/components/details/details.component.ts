import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ProductModel} from '../../shared/models/product.model';
import {ProductInfoDetailModel} from '../../shared/models/product-info-detail.model';
import {Router} from '@angular/router';
import {CONSTANTS} from '../../shared/constants/constants';
import {LABELS} from '../../shared/constants/labels-constants';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public product: ProductModel;
  public productInfo: ProductInfoDetailModel;
  public labels = {...LABELS.PRODUCTS, ...LABELS.CARDS};
  public BANKS = CONSTANTS.BANKS;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.product = this.productService.getProduct();
    this.productInfo = this.productService.getProductInfoDetail();
    if (!Boolean(this.product) || !Boolean(this.productInfo)) {
      this.goToDashboard();
    }
  }

  public goToDashboard(): void {
    this.router.navigate([CONSTANTS.ROUTES.DASHBOARD]);
  }

  public getDate(selectedDate: string): string {
    const date = new Date(selectedDate);
    // tslint:disable-next-line:max-line-length
    return `${this.getDayWithTwoDigits(date.getDate().toString())}-${this.getDayWithTwoDigits((date.getMonth() + 1).toString())}-${date.getFullYear()}`;
  }

  private getDayWithTwoDigits(date: string): string {
    const newDate = '0' + date;
    return newDate.slice(-2);
  }
}
