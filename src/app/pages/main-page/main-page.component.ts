import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { Observable, combineLatest } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country-service.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule, 
    MatAutocompleteModule, 
    MatListModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  public countryName = new FormControl('');
  public filteredCountries$!: Observable<Country[]>;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.filteredCountries$ = combineLatest([
      this.countryService.countries$,
      this.countryName.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        map(value => value?.toLowerCase() || '')
      )
    ]).pipe(
      map(([countries, searchTerm]) => 
        countries.filter(country => country.name.toLowerCase().includes(searchTerm))
      )
    );

    this.countryService.getCountries();
  }
}
