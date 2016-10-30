/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoteTranslationService } from './note-translation.service';

describe('Service: NoteTranslation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteTranslationService]
    });
  });

  it('should ...', inject([NoteTranslationService], (service: NoteTranslationService) => {
    expect(service).toBeTruthy();
  }));
});
