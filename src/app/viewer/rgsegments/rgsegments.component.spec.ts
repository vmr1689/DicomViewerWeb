import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgsegmentsComponent } from './rgsegments.component';

describe('RgsegmentsComponent', () => {
  let component: RgsegmentsComponent;
  let fixture: ComponentFixture<RgsegmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgsegmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgsegmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
