import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OopsComponentComponent } from './oops-component.component';

describe('OopsComponentComponent', () => {
  let component: OopsComponentComponent;
  let fixture: ComponentFixture<OopsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OopsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OopsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
