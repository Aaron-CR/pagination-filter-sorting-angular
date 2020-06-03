import { Customer } from './customer';
import { Payment } from './payment';
import { InvoiceDetail } from './invoice-detail';
import { Employee } from './employee';
import { Base } from './base';

export class Invoice extends Base {
  totalAmount: number;
  customer: Customer;
  employee: Employee;
  payment: Payment;
  details: InvoiceDetail[];
}
