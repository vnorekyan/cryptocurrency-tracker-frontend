import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PortfolioService, AlertService, TransactionService, UserService, CryptoSearchService } from '../../_services/index';
import { Portfolio, Transaction, Cryptocurrency } from '../../_models/index';

import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  balance = 100;
  transaction = new Transaction();
  portfolio = new Portfolio();
  model: any = {};

  // From the crypto search component
  cryptoName = '';
  crypto: any = {};
  clicked = true;
  price: number;
  cryptocurrencies: Observable<Cryptocurrency[]>;
  private searchTerms = new Subject<string>();


  constructor(private portfolioService: PortfolioService,
    private transactionService: TransactionService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private cryptoSearchService: CryptoSearchService) {
    this.crypto.value = 0;
  }

  // For the search crypto component
  search(term: string): void {
    // console.log(term);
    this.searchTerms.next(term);
  }

  clickedInput() {
    console.log('focus');
    this.clicked = true;
  }

  updateValue(quantity) {
    this.crypto.quantity = quantity;
    this.crypto.value = quantity * this.price;
  }

  // This adds the price to the Cryptocurrency that you pick in the box
  update(value, symbol, id) {
    this.clicked = false;
    this.crypto.symbol = symbol;
    this.crypto.name = value;
    this.crypto.id = id;
    this.cryptoName = value;
    console.log('cryptoId', id);
    this.cryptoSearchService.searchCryptoPrice(this.crypto.symbol)
      .subscribe(data => {
        console.log('price', data);
        this.price = data.USD;
        this.crypto.price = data.USD;
      },
      error => {
        this.alertService.error(error);
      });
  }

  buyCrypto() {
    if (this.balance >= this.crypto.value) {
      // Handles adding new transaction 
      this.transaction.currency = this.crypto.name;
      this.transaction.quantity = this.crypto.quantity;
      this.transaction.price = this.crypto.price;
      this.transaction.buy = true;
      this.transactionService.addTransaction(this.transaction)
        .subscribe(
        data => {
          console.log('made new transaction', data);
        },
        error => {
          this.alertService.error(error);
        });


      // // Handles adding to the portfolio
      // this.portfolio.currencyId = this.model.currencyId;
      this.portfolio.currencyId = this.crypto.id;
      this.portfolio.amount = this.model.quantity;
      this.portfolio.value = this.crypto.value;
      this.portfolio.buy = true;
      this.portfolioService.addToPortfolio(this.portfolio)
        .subscribe(
        data => {
          console.log('made new portfolio', data);
          this.router.navigate(['/user/portfolio']);
        },
        error => {
          this.alertService.error(error);
        });

      // Handles updating user balance
      this.userService.updateBalance(this.crypto.value, true)
        .subscribe(
        data => {
          console.log('changed balance');
          this.router.navigate(['/user/portfolio']);
        },
        error => {
          this.alertService.error(error);
        });

      setTimeout(() => {
        this.router.navigate(['/user/portfolio']);
      }, 100);
    } else {

      this.alertService.error( 'Your Account Balance is too low' );
      this.router.navigate(['/user-options/buy']);
    }


  }

  ngOnInit() {
    this.userService.getProfile()
      .subscribe(data => {
        this.balance = data.balance;
      });

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
