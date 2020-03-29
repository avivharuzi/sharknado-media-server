import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBigComponent } from './select-big.component';

describe('SelectBigComponent', () => {
  let component: SelectBigComponent;
  let fixture: ComponentFixture<SelectBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectBigComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
