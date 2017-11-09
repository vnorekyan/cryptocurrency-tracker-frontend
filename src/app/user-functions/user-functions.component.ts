import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-functions',
  templateUrl: './user-functions.component.html',
  styleUrls: ['./user-functions.component.css']
})
export class UserFunctionsComponent implements OnInit {
  title = "Buy, Sell, or Watch";
  constructor() { }

  ngOnInit() {
  }

}
