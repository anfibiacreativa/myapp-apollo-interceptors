import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatTeaserComponent } from './cat-teaser.component';

describe('CatTeaserComponent', () => {
  let component: CatTeaserComponent;
  let fixture: ComponentFixture<CatTeaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatTeaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
