import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitText'
})
export class LimitTextPipe implements PipeTransform {

  transform(value: string, maxLength: number): any {
    if (value.length > maxLength) {
      value = `${value.slice(0, maxLength)} ...`;
    }
    return value;
  }

}
