import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Transaction } from '../_models/index';

@Injectable()
export class TransactionService {

  constructor(private http: Http) { }

  getTransactions() {
    return this.http.get(`${environment.transaction}`, this.jwt()).map((response => response.json()));
  }

  addTransaction(transaction: Transaction) {
    console.log('transaction', transaction);
    return this.http.post(`${environment.transaction}`, transaction, this.jwt())
      .map((response => response.json()));
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
