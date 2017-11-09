import { Component, OnInit } from '@angular/core';
import { PortfolioService, AlertService, CryptoSearchService, TransactionService, UserService } from '../../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Portfolio, Transaction, Cryptocurrency } from '../../_models/index';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  model: any = {};
  transaction = new Transaction();
  portfolio = new Portfolio();
  balance = 100;


  cryptoName = '';
  crypto: any = {};
  clicked = true;
  price: any;
  cryptocurrencies: Observable<Cryptocurrency[]>;
  private searchTerms = new Subject<string>();

  constructor(private portfolioService: PortfolioService,
    private transactionService: TransactionService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private cryptoSearchService: CryptoSearchService) { }

  // For the search crypto component
  search(term: string): void {
    // console.log(term);
    this.searchTerms.next(term);
  }

  clickedInput() {
    console.log('focus');
    this.clicked = true;
    console.log('cryptocurrencies', this.cryptocurrencies);
  }

  updateValue(quantity) {
    this.crypto.quantity = quantity;
    this.crypto.value = quantity * this.price;
  }

  // This adds the price to the Cryptocurrency that you pick in the box
  update(value, symbol, id, amount) {
    this.clicked = false;
    this.crypto.symbol = symbol;
    this.crypto.name = value;
    this.crypto.id = id;
    this.crypto.portAmount = amount;
    this.cryptoName = value;
    console.log('amount', amount);
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


  sellCrypto() {
    if (this.crypto.portAmount >= this.crypto.quantity) {
      // Handles adding new transaction
      this.transaction.currency = this.crypto.name;
      this.transaction.quantity = this.crypto.quantity;
      this.transaction.price = this.crypto.price;
      this.transaction.buy = false;
      this.transactionService.addTransaction(this.transaction)
        .subscribe(
        data => {
          console.log('made new sell transaction', data);
        },
        error => {
          this.alertService.error(error);
        });

      // Handles updating user balance
      this.userService.updateBalance(this.crypto.value, false)
        .subscribe(
        data => {
          console.log('changed balance');
        },
        error => {
          this.alertService.error(error);
        });


      // // Handles adding to the portfolio
      // this.portfolio.currencyId = this.model.currencyId;
      this.portfolio.currencyId = this.crypto.id;
      this.portfolio.amount = this.crypto.quantity;
      this.portfolio.value = this.crypto.value;
      this.portfolio.buy = false;
      console.log(this.portfolio);
      this.portfolioService.addToPortfolio(this.portfolio)
        .subscribe(
        data => {
          console.log('made new - portfolio', data);
        },
        error => {
          this.alertService.error(error);
        });
      setTimeout(() => {
        this.router.navigate(['/user/portfolio']);
      }, 100);
    } else {
      this.alertService.error('You are trying to sell too many coins of this currency');

    }


  }

  ngOnInit() {
    this.userService.getProfile()
      .subscribe(data => {
        this.balance = data.balance;
      },
      error => {
        this.alertService.error(error);
      });


    this.cryptocurrencies = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.cryptoSearchService.searchPortfolio(term)),
    );
  }

}
