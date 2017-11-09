import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDashComponent } from './portfolio-dash.component';

describe('PortfolioDashComponent', () => {
  let component: PortfolioDashComponent;
  let fixture: ComponentFixture<PortfolioDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
