import { TestBed, inject } from '@angular/core/testing';

import { CryptocurrencyService } from './cryptocurrency.service';

describe('CryptocurrencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptocurrencyService]
    });
  });

  it('should be created', inject([CryptocurrencyService], (service: CryptocurrencyService) => {
    expect(service).toBeTruthy();
  }));
});
