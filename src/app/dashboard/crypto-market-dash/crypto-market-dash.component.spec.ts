import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoMarketDashComponent } from './crypto-market-dash.component';

describe('CryptoMarketDashComponent', () => {
  let component: CryptoMarketDashComponent;
  let fixture: ComponentFixture<CryptoMarketDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoMarketDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoMarketDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
