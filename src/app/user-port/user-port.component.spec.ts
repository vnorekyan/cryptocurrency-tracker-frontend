import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPortComponent } from './user-port.component';

describe('UserPortComponent', () => {
  let component: UserPortComponent;
  let fixture: ComponentFixture<UserPortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
