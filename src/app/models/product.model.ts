import {TypeAccountEnum} from '../enums/type-account.enum';
import {ProductAccountBalanceModel} from './product-account-balance.model';

export interface ProductModel {
  accountInformation?: AccountInformationModel;
  locked?: boolean;
  id?: string;
  typeAccount?: TypeAccountEnum;
  openedDate?: string;
  closedDate?: string;
  dueDate?: string;
  lastTransactionDate?: string;
  status?: string;
  overDraftDays?: number;
  periodicityOfPayment?: PeriodicityModel;
  term?: PeriodicityModel;
  productAccountBalances?: ProductAccountBalanceModel;
  capacity?: number;
}

export interface AccountInformationModel {
  accountIdentifier?: string;
  productType?: TypeAccountEnum;
  bank?: string;
}

export interface PeriodicityModel {
  count?: number;
  units?: string;
}

