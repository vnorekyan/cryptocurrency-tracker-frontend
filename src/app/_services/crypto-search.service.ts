import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Cryptocurrency } from '../_models/index';
import 'rxjs/add/operator/map';

@Injectable()
export class CryptoSearchService {

  constructor(private http: Http) { }

  search(term: string): Observable<Cryptocurrency[]> {
    console.log(term);
    return this.http.get(`${environment.cryptoSearch}?name=${term}`)
      .map(response => response.json() as Cryptocurrency[]);
  }

  searchPortfolio(term: string): Observable<Cryptocurrency[]> {
    return this.http.get(`${environment.portfolio}?name=${term}`,  this.jwt())
      .map(response => {
        console.log(response.json());
        return response.json() as Cryptocurrency[];
      }
    );
  }

  searchCryptoPrice(symbol) {
    return this.http.get(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`).map(response => response.json());
  }

  private jwt() {
    // create authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('token'));
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + token });
      return new RequestOptions({ headers: headers });
    }
  }

}
