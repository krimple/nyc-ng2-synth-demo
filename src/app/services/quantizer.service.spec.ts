/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuantizerService } from './quantizer.service';

describe('Service: Quantizer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuantizerService]
    });
  });

  it('should ...', inject([QuantizerService], (service: QuantizerService) => {
    expect(service).toBeTruthy();
  }));
});
