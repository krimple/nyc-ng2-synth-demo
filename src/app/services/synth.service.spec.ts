/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SynthService } from './synth.service';

describe('Service: Synth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SynthService]
    });
  });

  it('should ...', inject([SynthService], (service: SynthService) => {
    expect(service).toBeTruthy();
  }));
});
