import { Customer } from './customer';
import { Payment } from './payment';
import { InvoiceDetail } from './invoice-detail';
import { Employee } from './employee';
import { Base } from './base';

export class Invoice extends Base {
  amount: number;
  customer: Customer;
  employee: Employee;
  paymentMethod: Payment;
  details: InvoiceDetail[];
}
