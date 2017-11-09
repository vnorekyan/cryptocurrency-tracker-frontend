import { Component, OnInit } from '@angular/core';
import { TrackingService, AlertService, CryptoSearchService } from '../../_services/index';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FormsModule, NgForm } from '@angular/forms';
import { Tracking, Cryptocurrency } from '../../_models/index';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  cryptoName = '';
  crypto: any = {};
  clicked = true;
  price: any;
  cryptocurrencies: Observable<Cryptocurrency[]>;
  private searchTerms = new Subject<string>();

  constructor(private cryptoSearchService: CryptoSearchService,
    private alertService: AlertService, private trackingService: TrackingService, private router: Router) {

  }

  search(term: string): void {
    // console.log(term);
    this.searchTerms.next(term);
  }

  clickedInput() {
    console.log('focus');
    this.clicked = true;
  }

  update(value, symbol, id) {
    
    this.clicked = false;
    console.log('value before button click' + this.cryptoName);
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

  trackCrypto(userForm: NgForm) {

    // let cryptocurrencyId = userForm.controls['cryptocurrency'].value;
    this.trackingService.addTracking(this.crypto.id)
      .subscribe(
      data => {
        console.log('tracking', data);
      },
      error => {
        this.alertService.error(error);
      });

    setTimeout(() => {
      this.router.navigate(['/user/tracking']);
    }, 100);
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
