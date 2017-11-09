import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistDashComponent } from './watchlist-dash.component';

describe('WatchlistDashComponent', () => {
  let component: WatchlistDashComponent;
  let fixture: ComponentFixture<WatchlistDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchlistDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
