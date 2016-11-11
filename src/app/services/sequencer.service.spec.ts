/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SequencerService } from './sequencer.service';

describe('Service: Sequencer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SequencerService]
    });
  });

  it('should ...', inject([SequencerService], (service: SequencerService) => {
    expect(service).toBeTruthy();
  }));
});
