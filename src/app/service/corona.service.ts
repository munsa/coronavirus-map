import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  // URL which returns list of JSON items (API end-point URL)
  private readonly URL = 'https://api.covid19tracking.narrativa.com/api/2020-03-22/country/spain';

  constructor(private http: HttpClient) { }

  getCoronaData(): Observable<any> {
    console.log('Request is sent!');
    return this.http.get(this.URL);
  }
}
