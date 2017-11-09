import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { User } from '../_models/index';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  login(email: string, password: string) {
    return this.http.post(`${environment.userLogin}`, { email: email, password: password })
      .map((response) => {
        let res = response.json();
        let user = res.user;
        let token = res.token;
        console.log(response);
        if (token && user) {
          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    return this.http.get(`${environment.userLogout}`)
      .map((response => response.json()));
  }

  create(object) {
    let user = {
      id: object.id,
      email: object.email,
      password: object.password,
      first_name: object.firstName,
      last_name: object.lastName,
      balance: object.balance
    };

    return this.http.post(`${environment.userSignup}`, user)
      .map((response) => {
        console.log('backend', response)
        let res = response.json();
        if (res.user && res.token) {
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          localStorage.setItem('token', JSON.stringify(res.token));
        }
        return res.user;
      });
  }

  update(object) {
    let user = {
      id: object.id,
      email: object.email,
      password: object.password,
      first_name: object.firstName ? object.firstName : object.first_name,
      last_name: object.lastName ? object.lastName : object.last_name,
      balance: object.balance
    };
    return this.http.put(`${environment.userProfile}`, user, this.jwt())
      .map((response => response.json()));
  }

  getProfile() {
    return this.http.get(`${environment.userProfile}`, this.jwt())
      .map((response => response.json()));
  }

  delete() {
    return this.http.delete(`${environment.userDelete}`, this.jwt())
      .map((response => response.json()));
  }

  updateBalance(balance, buy) {
    return this.http.put(`${environment.userBalance}`, {
      buy: buy,
      transactionValue: balance
    }, this.jwt())
      .map((response => response.json()));
  }

  loggedIn() {
    console.log('loggin')
    let token = JSON.parse(localStorage.getItem('token'));
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (token && currentUser) {
      return true;
    } else {
      return false;
    }
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
