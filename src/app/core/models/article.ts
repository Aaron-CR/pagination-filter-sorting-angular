import { Base } from './base';

export class Article extends Base {
  name: string;
  category: string;
  unitPrice: number;
  stockUnits: number;
}
