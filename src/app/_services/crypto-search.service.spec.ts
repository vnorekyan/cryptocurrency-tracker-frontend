import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { CryptoSearchService } from './crypto-search.service';

describe('CryptoSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoSearchService],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([CryptoSearchService], (service: CryptoSearchService) => {
    expect(service).toBeTruthy();
  }));
});
