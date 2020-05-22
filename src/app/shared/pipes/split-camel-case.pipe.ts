import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitCamelCase'
})
export class SplitCamelCasePipe implements PipeTransform {

  transform(value: string) {
    if ((typeof value) !== 'string') {
      return value;
    }

    return value.split(/(?=[A-Z])/).join(' ').toUpperCase();
  }

}
