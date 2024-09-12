import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Country } from '../models/country.model';
import { environment } from '../environments/environment';
import { ENDPOINTS } from '../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  public countries$ = new BehaviorSubject<Country[]>([]);
  private readonly URL: string = `${environment.API_URL}${ENDPOINTS.countries}`;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private readonly http: HttpClient) { }

  public getCountries(): void {
    this.http.get<Country[]>(this.URL, this.httpOptions).subscribe({
      next: (countries) => {
        this.countries$.next(countries);
      },
      error: (error) => {
        console.error('Ошибка при загрузке данных:', error);
        this.countries$.next([]);
      }
    });
  }
}
