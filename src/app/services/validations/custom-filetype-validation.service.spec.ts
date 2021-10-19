import { TestBed } from '@angular/core/testing';

import { CustomFiletypeValidationService } from './custom-filetype-validation.service';

describe('CustomFiletypeValidationService', () => {
  let service: CustomFiletypeValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomFiletypeValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
