import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from '../home-page/home-page.component';

import { DashboardComponent } from './dashboard.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { UserFunctionsModule } from '../user-functions/user-functions.module';
import { UserModule } from '../user/user.module';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        UserModule,
        UserFunctionsModule,
        AppModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
