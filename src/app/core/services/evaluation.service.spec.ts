import { TestBed } from '@angular/core/testing';
import { EvaluatorService } from './evaluation.service';
import { take } from 'rxjs';

describe('EvaluatorService', () => {
  let service: EvaluatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should concatenate object values alphabetically by keys after 2 seconds', (done) => {
    const inputObject = { ant: 2, cricket: 4, bee: 3 };
    const expectedOutput = '234';

    service
      .concatenate(inputObject)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toBe(expectedOutput);
        done();
      });
  });

  it('should return false if sum of object is odd', (done) => {
    const inputObj = { ant: 2, cricket: 4, bee: 3 };
    service
      .parity(inputObj)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toBe(false);
        done();
      });
  });
});
