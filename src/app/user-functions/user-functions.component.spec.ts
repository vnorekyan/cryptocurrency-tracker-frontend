import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';

import { UserFunctionsComponent } from './user-functions.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { AppModule } from '../app.module';
import { UserService } from '../_services/user.service';

describe('UserFunctionsComponent', () => {
  let component: UserFunctionsComponent;
  let fixture: ComponentFixture<UserFunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule,
        AppRoutingModule,
        AppModule
      ],
      providers: [UserService,
        { provide: APP_BASE_HREF, useValue: '/' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
