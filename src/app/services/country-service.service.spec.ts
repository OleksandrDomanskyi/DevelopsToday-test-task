import { TestBed } from '@angular/core/testing';
import { CountryService } from './country-service.service';

describe('CountryService', () => {
  let service: CountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});