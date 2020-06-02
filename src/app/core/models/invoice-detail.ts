import { Base } from './base';
import { Invoice } from './invoice';
import { Article } from './article';

export class InvoiceDetail extends Base {
  invoice: Invoice;
  article: Article;
  quantity: number;
  amount: number;
}
