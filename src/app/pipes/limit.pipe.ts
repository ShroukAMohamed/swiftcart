import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit',
  standalone: true
})
export class LimitPipe implements PipeTransform {

  transform(overview:string,limit:number): string {
    return overview?.split(' ').slice(0,limit).join(' ')
  }

}
