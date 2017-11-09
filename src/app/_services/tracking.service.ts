import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Tracking } from '../_models/index';

@Injectable()
export class TrackingService {

  constructor(private http: Http) { }

  getTracking() {
    return this.http.get(`${environment.tracking}`, this.jwt()).map((response => response.json()));
  }

  addTracking(currencyId) {
    return this.http.post(`${environment.tracking}`, { currencyId: currencyId }, this.jwt())
      .map((response => response.json()));
  }

  deleteTracking(currencyId) {

    return this.http.delete(`${environment.tracking}/${currencyId}`, this.jwt())
      .map((response => response.json()));
  }

  getCryptoDataForTracking(trackingData) {
    for (let i = 0; i < trackingData.length; i++) {
      this.http.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${trackingData[i].symbol}&tsyms=USD`).map(response => response.json())
        .subscribe(data => {
          console.log('DATA:', data.RAW[`${trackingData[i].symbol}`].USD);
          let obj = data.RAW[`${trackingData[i].symbol}`].USD;
          trackingData[i].price = obj.PRICE;
          trackingData[i].marketValue = obj.MKTCAP;
          trackingData[i].changeVal = obj.CHANGE24HOUR;
          trackingData[i].changePerc = obj.CHANGEPCT24HOUR;
        });
    }
    return trackingData;
  }

  // private helper methods
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
