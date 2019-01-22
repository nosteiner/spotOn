import { TestBed } from '@angular/core/testing';

import { GlassesService } from './glasses.service';

describe('GlassesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlassesService = TestBed.get(GlassesService);
    expect(service).toBeTruthy();
  });
});
