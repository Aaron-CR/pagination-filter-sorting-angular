import { Customer } from './customer';
import { Payment } from './payment';
import { InvoiceDetail } from './invoice-detail';

export class Invoice {
  id: number;
  date: Date;
  amount: number;
  customer: Customer;
  paymentMethod: Payment;
  details: InvoiceDetail[];
}
