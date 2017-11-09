import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NgForm, FormsModule } from '@angular/forms';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


import { Cryptocurrency } from '../../_models/index';
import { CryptoSearchService, AlertService } from '../../_services/index';

@Component({
  selector: 'app-crypto-search',
  templateUrl: './crypto-search.component.html',
  styleUrls: ['./crypto-search.component.css']
})
export class CryptoSearchComponent implements OnInit {
  cryptoName = '';
  cryptoSymbol = '';
  clicked = true;
  price: any;
  cryptocurrencies: Observable<Cryptocurrency[]>;
  private searchTerms = new Subject<string>();

  constructor(private alertService: AlertService, private cryptoSearchService: CryptoSearchService) { }

  search(term: string): void {
    // console.log(term);
    this.searchTerms.next(term);
  }

  clickedInput() {
    console.log('focus');
    this.clicked = true;
  }

  update(value, symbol) {
    this.clicked = false;
    console.log('value before button click' + this.cryptoName);
    this.cryptoSymbol = symbol;
    this.cryptoName = value;
    this.cryptoSearchService.searchCryptoPrice(this.cryptoSymbol)
      .subscribe(data => {
        console.log('price', data);
        this.price = data.USD;
      },
      error => {
        this.alertService.error(error);
      });

  }

  ngOnInit() {
    this.cryptocurrencies = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.cryptoSearchService.search(term)),
    );
  }


}
