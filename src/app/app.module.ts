import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Module
import { UserFunctionsModule } from './user-functions/user-functions.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';

//Shared Components
import { NavComponent } from './shared/nav/nav.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { CryptoSearchService } from './_services/crypto-search.service';
import { APP_BASE_HREF } from '@angular/common';
import { PortfolioService } from './_services/portfolio.service';
import { TransactionService } from './_services/transaction.service';
import { TrackingService } from './_services/tracking.service';
import { CryptocurrencyService } from './_services/cryptocurrency.service';
import { AlertService } from './_services/alert.service';

import { TransactionsComponent } from './transactions/transactions.component';
import { PortfolioComponent } from './user-port/portfolio/portfolio.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TrackingComponent } from './user-port/tracking/tracking.component';
import { UserPortComponent } from './user-port/user-port.component';
import { CryptoMarketComponent } from './crypto-market/crypto-market.component';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    TransactionsComponent,
    PortfolioComponent,
    HomePageComponent,
    TrackingComponent,
    UserPortComponent,
    CryptoMarketComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    UserFunctionsModule,
    DashboardModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    UserModule
  ],
  providers: [
    PortfolioService,
    CryptoSearchService,
    TransactionService,
    TrackingService,
    CryptocurrencyService,
    AlertService,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
