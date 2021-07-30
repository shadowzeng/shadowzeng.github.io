import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaoComponent } from './hao.component';

describe('HaoComponent', () => {
  let component: HaoComponent;
  let fixture: ComponentFixture<HaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
