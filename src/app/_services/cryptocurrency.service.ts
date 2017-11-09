import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Portfolio } from '../_models/index';

// Used for streaming API
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class CryptocurrencyService {

  private url = 'https://streamer.cryptocompare.com/';
  private socket;

  constructor(private http: Http) {
    this.socket = io(this.url);
  }

  subscriptionString = '5~CCCAGG~';
  subscriptions = [];
  // subscriptions = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'];

  getCrypto() {
    return this.http.get(`${environment.cryptocurrency}`).map((response => {

      let responseArray = response.json();

      for (let i in responseArray) {
        this.subscriptions.push(`${this.subscriptionString}${responseArray[i].symbol}~USD`);
      }
      // console.log('subscriptions:', this.subscriptions);
      return response.json()
    }));
  }

  // getInitialPrices(input) {
  //   console.log('Getting prices...');
  //   console.log("INPUT:", input);
  //   for(let i in input) {
  //     this.http.get(`https://min-api.cryptocompare.com/data/price?fsym=${input[i].symbol}&tsyms=USD`)
  //     .subscribe(data => {
  //       console.log("DATA:", JSON.parse(data['_body']).USD);
  //       input[i].price = JSON.parse(data['_body']).USD;
  //     })
  //   }
  // }

  getInitialPrices(input) {
    console.log('Getting prices...');
    console.log("INPUT:", input);
    for (let i in input) {
      this.http.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${input[i].symbol}&tsyms=USD`).map(response => response.json())
        .subscribe(data => {
          // console.log('DATA:', data.RAW[`${input[i].symbol}`].USD);
          let obj = data.RAW[`${input[i].symbol}`].USD;
          input[i].price = obj.PRICE.toFixed(2);
          input[i].marketValue = obj.MKTCAP.toFixed(2);
          input[i].changeVal = obj.CHANGE24HOUR.toFixed(2);
          input[i].changePerc = obj.CHANGEPCT24HOUR.toFixed(2);
        });
    }
    return input;
  }

  establishCryptoConnection() {
    this.socket.emit('SubAdd', { subs: this.subscriptions });
  }

  getCryptoInfo() {
    const observable = new Observable(observer => {
      // this.socket = io(this.url);
      this.socket.on('m', (data) => {
        // console.log('data:', data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
