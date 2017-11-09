import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from '../home-page/home-page.component';
import { LogoutComponent } from '../user/logout/logout.component';

import { LoginComponent } from '../user/login/login.component';
import { CreateUserComponent } from '../user/create-user/create-user.component';
import { UserProfileComponent } from '../user/user-profile/user-profile.component';
import { EditProfileComponent } from '../user/edit-profile/edit-profile.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PortfolioComponent } from '../user-port/portfolio/portfolio.component';
import { UserPortComponent } from '../user-port/user-port.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import { TrackingComponent } from '../user-port/tracking/tracking.component';
import { UserFunctionsComponent } from '../user-functions/user-functions.component';
import { BuyComponent } from '../user-functions/buy/buy.component';
import { WatchComponent } from '../user-functions/watch/watch.component';
import { SellComponent } from '../user-functions/sell/sell.component';
import { CryptoMarketComponent } from '../crypto-market/crypto-market.component';


const routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'logout', component: LogoutComponent
  },
  {
    path: 'create-user', component: CreateUserComponent
  },
  {
    path: 'user-profile', component: UserProfileComponent
  },
  {
    path: 'edit-profile', component: EditProfileComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'user', component: UserPortComponent,
    children: [
      {
        path: 'portfolio', component: PortfolioComponent
      },
      {
        path: 'tracking', component: TrackingComponent
      }
    ]
  },
  {
    path: 'transactions', component: TransactionsComponent
  },
  {
    path: 'user-options', component: UserFunctionsComponent,
    children: [
      {
        path: 'buy', component: BuyComponent
      },
      {
        path: 'sell', component: SellComponent
      },
      {
        path: 'watch', component: WatchComponent
      }
    ]
  },
  {
    path: 'crypto', component: CryptoMarketComponent
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
