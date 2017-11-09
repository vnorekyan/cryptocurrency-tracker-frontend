import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyComponent } from './buy/buy.component';
import { WatchComponent } from './watch/watch.component';
import { SellComponent } from './sell/sell.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { UserFunctionsComponent } from './user-functions.component';
import { CryptoSearchComponent } from './crypto-search/crypto-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
  ],
  declarations: [
    BuyComponent,
    WatchComponent,
    SellComponent,
    UserFunctionsComponent,
    CryptoSearchComponent
  ],
  exports: [
    BuyComponent,
    WatchComponent,
    SellComponent,
    UserFunctionsComponent,
    CryptoSearchComponent
  ]
})
export class UserFunctionsModule { }
