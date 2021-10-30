import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private countryCache$ : Observable<any[]> | undefined  ;
  constructor(private https : HttpClient) { }

  getAllCountries() : Promise<any[]> {
    if(!this.countryCache$){
       this.countryCache$ = this.https.get<[]>(`${environment.apiUrl}/v2/all`)
       .pipe(shareReplay(1));
    }
    return this.countryCache$?.toPromise();
  }
}
