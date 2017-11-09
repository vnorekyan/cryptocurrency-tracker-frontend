import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDashComponent } from './portfolio-dash/portfolio-dash.component';
import { WatchlistDashComponent } from './watchlist-dash/watchlist-dash.component';
import { CryptoMarketDashComponent } from './crypto-market-dash/crypto-market-dash.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    PortfolioDashComponent,
    WatchlistDashComponent,
    CryptoMarketDashComponent,
    DashboardComponent
  ],
  exports: [
    PortfolioDashComponent,
    WatchlistDashComponent,
    CryptoMarketDashComponent,
  ],
  providers: [
  ]
})
export class DashboardModule { }
