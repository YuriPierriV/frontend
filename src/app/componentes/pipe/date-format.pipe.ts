import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, format: string = 'dd/MM/yyyy HH:mm:ss', subtractHours: number = 3): any {
    if (!value) return value;

    let date = new Date(value);
    date.setHours(date.getHours() - subtractHours);

    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

}
