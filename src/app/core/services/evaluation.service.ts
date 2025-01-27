import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvaluatorService {
  concatenate(inputObj: Record<string, number>) {
    const sortedKeys = Object.keys(inputObj).sort();
    const result = sortedKeys.map((key) => inputObj[key]).join('');

    return of(result).pipe(delay(2000));
  }

  parity(inputObj: Record<string, number>) {
    const total = Object.values(inputObj).reduce((acc, curr) => acc + curr, 0);
    return of(total % 2 === 0);
  }
}
