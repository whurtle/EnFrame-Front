import { TestBed } from '@angular/core/testing';

import { UserRegestrationService } from './user-regestration.service';

describe('UserRegestrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRegestrationService = TestBed.get(UserRegestrationService);
    expect(service).toBeTruthy();
  });
});
