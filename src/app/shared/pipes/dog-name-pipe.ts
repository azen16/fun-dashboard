import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dogName',
})
export class DogNamePipe implements PipeTransform {

  transform(value: string | undefined | null): string {
    if (!value) return '';
    return value
      .split('-')
      .reverse()
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
