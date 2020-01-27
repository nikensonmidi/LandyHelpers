import { TestBed } from '@angular/core/testing';

import { UserartifactsService } from './userartifacts.service';

describe('UserartifactsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserartifactsService = TestBed.get(UserartifactsService);
    expect(service).toBeTruthy();
  });
});
