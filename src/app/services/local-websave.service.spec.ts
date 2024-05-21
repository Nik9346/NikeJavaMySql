import { TestBed } from '@angular/core/testing';

import { LocalWebsaveService } from './local-websave.service';

describe('LocalWebsaveService', () => {
  let service: LocalWebsaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalWebsaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
