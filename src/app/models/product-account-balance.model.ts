export interface ProductAccountBalanceModel {
  // CDT
  saldo_pendiente_pago?: BalanceModel;
  tasa_nominal?: BalanceModel;
  interes_pagado?: BalanceModel;
  valor_constitucion?: BalanceModel;
  intereses_causados?: BalanceModel;
  retefuente?: BalanceModel;

  // Current Account - Sa
  saldo_canje?: BalanceModel;
  cupo_aprobado_remesas?: BalanceModel;
  cupos_aprobado_sobregiro?: BalanceModel;
  saldo_disponible?: BalanceModel;
  cupo_disponible_sobregiro?: BalanceModel;
  saldo_canje_48_horas?: BalanceModel;
  saldo_canje_72_horas?: BalanceModel;
  saldo_canje_24_horas?: BalanceModel;
  saldo_ayer?: BalanceModel;
  saldo_actual?: BalanceModel;

  // Credit Card
  pago_total_pesos?: BalanceModel;
  cupo_disponible_avances_pesos?: BalanceModel;
  saldo_mora_pesos?: BalanceModel;
  cupo_disponible_compras_pesos?: BalanceModel;
  valor_pago_minimo?: BalanceModel;
  cupo_total?: BalanceModel;
}

export interface BalanceModel {
  amount?: number;
  rate?: number;
  currencyCode?: string;
}
