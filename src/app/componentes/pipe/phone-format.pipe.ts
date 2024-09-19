import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value:any): string {
    if (!value) {
      return '';
    }

    const formattedValue = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    return formattedValue;
  }
}
