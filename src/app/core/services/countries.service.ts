import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private countryCache$ : Observable<Country[]> | undefined  ;
  constructor(private https : HttpClient) { }

  getAllCountries() : Promise<Country[]> {
    if(!this.countryCache$){
       this.countryCache$ = this.https.get<[]>(`${environment.apiUrl}/v2/all`)
       .pipe(shareReplay(1));
    }
    return this.countryCache$?.toPromise();
  }
 
}
