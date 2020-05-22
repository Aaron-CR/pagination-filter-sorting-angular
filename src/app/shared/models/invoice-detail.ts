import { Invoice } from './invoice';
import { Article } from './article';

export class InvoiceDetail {
  id: number;
  invoice: Invoice;
  article: Article;
  quantity: number;
  amount: number;
}
