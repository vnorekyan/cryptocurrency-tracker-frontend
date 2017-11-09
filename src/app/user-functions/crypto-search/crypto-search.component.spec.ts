import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CryptoSearchComponent } from './crypto-search.component';
import { CryptoSearchService } from '../../_services/crypto-search.service';

describe('CryptoSearchComponent', () => {
  let component: CryptoSearchComponent;
  let fixture: ComponentFixture<CryptoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoSearchComponent ],
      imports: [FormsModule,
        HttpModule],
        providers: [
          CryptoSearchService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
