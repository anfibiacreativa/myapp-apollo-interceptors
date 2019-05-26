import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupporterAreaComponent } from './supporter-area.component';

describe('SupporterAreaComponent', () => {
  let component: SupporterAreaComponent;
  let fixture: ComponentFixture<SupporterAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupporterAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupporterAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
