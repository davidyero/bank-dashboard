import {ProductAccountBalanceModel} from './product-account-balance.model';

export interface ProductModel {
  accountInformation?: AccountInformationModel;
  locked?: boolean;
  id?: string;
  typeAccount?: string;
  openedDate?: string;
  closedDate?: string;
  dueDate?: string;
  paymentDate?: string;
  lastTransactionDate?: string;
  status?: string;
  overDraftDays?: number;
  periodicityOfPayment?: PeriodicityModel;
  term?: PeriodicityModel;
  productAccountBalances?: ProductAccountBalanceModel;
  capacity?: number;
  isFirst?: boolean;
}

export interface AccountInformationModel {
  accountIdentifier?: string;
  productType?: string;
  bank?: string;
  currencyCode?: string;
}

export interface PeriodicityModel {
  count?: number;
  units?: string;
}

