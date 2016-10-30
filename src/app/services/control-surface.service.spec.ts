/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ControlSurfaceService } from './control-surface.service';

describe('Service: ControlSurface', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlSurfaceService]
    });
  });

  it('should ...', inject([ControlSurfaceService], (service: ControlSurfaceService) => {
    expect(service).toBeTruthy();
  }));
});
