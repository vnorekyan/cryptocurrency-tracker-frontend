import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService, TrackingService, AlertService } from '../../_services/index';
import { Cryptocurrency } from '../../_models/index';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crypto-market-dash',
  templateUrl: './crypto-market-dash.component.html',
  styleUrls: ['./crypto-market-dash.component.css']
})
export class CryptoMarketDashComponent implements OnInit {
  cryptos: any = [];
  initialPrices: number[];

  constructor(private alertService: AlertService, private trackingService: TrackingService, private cryptocurrencyService: CryptocurrencyService, private router: Router) {

  }

  getCryptocurrency() {
    this.cryptocurrencyService.getCrypto()
      .subscribe(data => {
        this.cryptos = data;
        console.log(data);
        this.cryptocurrencyService.getInitialPrices(this.cryptos);
      });
  }

  ngOnInit() {
    this.getCryptocurrency();
    this.cryptocurrencyService.getCryptoInfo()
      .subscribe((response) => {
        var responseSymbol = response.toString().split('~')[2];
        var newPrice = response.toString().split('~')[5];
        // console.log(responseSymbol);
        // console.log('response:', response);
        for (let obj of this.cryptos) {
          if (obj.symbol === responseSymbol) {
            var price = parseFloat(newPrice) > 1 ? parseFloat(parseFloat(newPrice).toFixed(2)) : parseFloat(parseFloat(newPrice).toFixed(6));
            if (Math.abs(obj.price - price) < 100) {
              obj.price = price;
            }
          }
        }
      })
    this.cryptocurrencyService.establishCryptoConnection();
  }

}
