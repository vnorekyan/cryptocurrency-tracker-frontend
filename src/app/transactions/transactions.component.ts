import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../_services/transaction.service';
import { Transaction } from '../_models/index';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[];

  constructor(private transactionService: TransactionService, private router: Router) {

  }

  getTransaction() {
    this.transactionService.getTransactions()
      .subscribe(data => {
        this.transactions = data;
      });
  }

  ngOnInit() {
    this.getTransaction();
  }


}
