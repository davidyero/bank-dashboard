import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../models/product.model';
import {LABELS} from '../../constants/labels-constants';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {CONSTANTS} from '../../constants/constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewChecked {

  @Input() product: ProductModel;
  public labels = {...LABELS.PRODUCTS, ...LABELS.CARDS};
  public iconName = 'assets/icons/bell.svg';
  public productName = '';
  public titleBalance = '';
  public balance = '';
  public productId = '';
  public titleFooter = '';
  public informationFooter = '';
  public withPaymentDate;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.validateProductType();
  }

  ngAfterViewChecked(): void {
    if (this.product.typeAccount === 'CREDIT_CARD') {
      this.getPercentage();
    }
  }

  public viewDetails(): void {
    const {iconName, productName, titleBalance, balance, productId, titleFooter, informationFooter} = this;
    this.productService.setProduct(this.product);
    this.productService.setProductInfoDetail({
      iconName, productName, titleBalance, balance, productId, titleFooter, informationFooter
    });
    this.router.navigate([CONSTANTS.ROUTES.DETAILS]);
  }

  private validateProductType(): void {
    this.productId = this.product.id;
    switch (this.product.typeAccount) {
      case 'DEPOSIT_ACCOUNT':
        this.productName = this.labels.SAVING_ACCOUNT;
        this.titleBalance = this.labels.BALANCE;
        this.balance = this.product.productAccountBalances.saldo_disponible.amount.toLocaleString();
        this.iconName = 'assets/icons/deposit-account.png';
        break;
      case 'CREDIT_CARD':
        this.productName = this.labels.CREDIT_CARD;
        this.titleBalance = this.labels.SAVING_ACCOUNT;
        this.balance = this.product.productAccountBalances.cupo_disponible_compras_pesos.amount.toLocaleString();
        this.productId = this.getMaskCreditCardNumber();
        this.withPaymentDate = Boolean(this.product.paymentDate);
        if (this.withPaymentDate) {
          const date = new Date(this.product.paymentDate);
          this.titleFooter = this.labels.PAYMENT_DATE;
          this.informationFooter =
            `${this.getDayWithTwoDigits(date.getDate().toString())}-${this.getDayWithTwoDigits(date.getMonth().toString())}-${date.getFullYear()}`;
        } else {
          const date = new Date(this.product.dueDate);
          this.titleFooter = this.labels.DUE_DATE;
          this.informationFooter =
            `${this.getDayWithTwoDigits(date.getDate().toString())}-${this.getDayWithTwoDigits(date.getMonth().toString())}-${date.getFullYear()}`;
        }
        if (this.product.id[0] === '5') {
          this.iconName = 'assets/icons/mastercard.svg';
        } else {
          this.iconName = 'assets/icons/visa.svg';
        }
        break;
      case 'CURRENT_ACCOUNT':
        this.productName = this.labels.CURRENT_ACCOUNT;
        this.titleBalance = this.labels.AVAILABLE_BALANCE;
        this.balance = this.product.productAccountBalances.saldo_disponible.amount.toLocaleString();
        this.iconName = 'assets/icons/current-account.png';
        break;
      case 'CREDIT':
        this.productName = this.labels.CREDIT;
        this.titleBalance = this.labels.TO_PAY;
        this.balance = '0';
        this.iconName = 'assets/icons/credit.png';
        break;
      case 'CERTIFIED_DEPOSIT_TERM':
        this.productName = this.labels.CDT;
        this.titleBalance = this.labels.INVESTED_VALUE;
        this.balance = this.product.productAccountBalances.valor_constitucion.amount.toLocaleString();
        this.iconName = 'assets/icons/cdt.png';
        break;
      default:
        this.productName = '*';
        this.titleBalance = '*';
        break;
    }
  }

  private getMaskCreditCardNumber(): string {
    return `**** **** **** ${this.product.id.slice(-4)}`;
  }

  private getDayWithTwoDigits(date: string): string {
    const newDate = '0' + date;
    return newDate.slice(-2);
  }

  private getPercentage(): void {
    const stepper = (document.getElementById(this.product.id) as HTMLElement);
    const {pago_total_pesos, cupo_total} = this.product.productAccountBalances;
    if (stepper && pago_total_pesos.amount > 0) {
      const totalPercentage = (100 * pago_total_pesos.amount / cupo_total.amount);
      stepper.style.width = `${Math.round(totalPercentage)}%`;
    }
  }
}
