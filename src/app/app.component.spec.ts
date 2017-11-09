import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { UserFunctionsModule } from './user-functions/user-functions.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

//Shared Components
import { NavComponent } from './shared/nav/nav.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

//User components
import { LoginComponent } from './user/login/login.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { UserService } from './_services/user.service';

import { CryptoSearchService } from './_services/crypto-search.service';

import { TransactionsComponent } from './transactions/transactions.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HomePageComponent } from './home-page/home-page.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        UserProfileComponent,
        CreateUserComponent,
        EditProfileComponent,
        TransactionsComponent,
        PortfolioComponent,
        HomePageComponent,
      ],
      imports: [
        BrowserModule,
        UserFunctionsModule,
        DashboardModule,
        AppRoutingModule,
        FormsModule,
        HttpModule
      ],
      providers: [
        UserService,
        CryptoSearchService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Cryptocurrency Tracker');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Crypto Tracker');
  }));
});
