import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KmsegmentsComponent } from './kmsegments.component';

describe('KmsegmentsComponent', () => {
  let component: KmsegmentsComponent;
  let fixture: ComponentFixture<KmsegmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KmsegmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KmsegmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
