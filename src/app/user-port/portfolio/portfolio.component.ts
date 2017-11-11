import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from '../../_services/portfolio.service';
import { Portfolio } from '../../_models/index';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  value = 0;
  percentage = 40;
  portfolios: any;

  constructor(private portfolioService: PortfolioService, private router: Router) { }

  getPortfolio() {
    this.portfolioService.getPortfolio()
      .subscribe(data => {
        console.log(data);
        this.portfolios = data;
        this.getCryptoPriceData();
      });
  }

  getBalance() {
    this.portfolios.forEach(portfolio => {
      console.log(portfolio.amount, 'amout', portfolio.currency.price, 'price');
      portfolio.currency.marketValue = portfolio.amount * portfolio.currency.price;
      this.value += portfolio.currency.marketValue;
      // console.log('Type:', portfolio.currency.price*portfolio.amount - portfolio.purchasedPrice);
      console.log('Price:', portfolio.currency.price);
      console.log('Amount:', portfolio.amount);
      console.log('Purchased Price:', portfolio.purchasedPrice);
    });
  }

  getCryptoPriceData() {
    if (this.portfolioService.getCryptoDataForPortfolio(this.portfolios)) {
      setTimeout(() => {
        this.getBalance();
      }, 1000);
    }
    console.log(this.portfolios);
  }

  ngOnInit() {
    this.getPortfolio();
  }

}
