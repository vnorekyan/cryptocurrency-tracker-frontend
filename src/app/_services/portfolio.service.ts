import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Portfolio } from '../_models/index';

@Injectable()
export class PortfolioService {

  constructor(private http: Http) { }

  getPortfolio() {
    return this.http.get(`${environment.portfolio}`, this.jwt()).map((response => response.json()));
  }

  addToPortfolio(portfolio: Portfolio) {
    return this.http.post(`${environment.portfolio}`, portfolio, this.jwt())
      .map((response => response.json()));
  }

  getCryptoDataForPortfolio(portfolioData) {
    console.log(portfolioData[0].currency.symbol);
    for (let i = 0; i < portfolioData.length; i++) {
      this.http.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${portfolioData[i].currency.symbol}&tsyms=USD`).map(response => response.json())
        .subscribe(data => {
          console.log('DATA:', data.RAW[`${portfolioData[i].currency.symbol}`].USD);
          let obj = data.RAW[`${portfolioData[i].currency.symbol}`].USD;
          portfolioData[i].currency.price = obj.PRICE;
        });
    }
    return true;
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