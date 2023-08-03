import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonalplannedComponent } from './zonalplanned.component';

describe('ZonalplannedComponent', () => {
  let component: ZonalplannedComponent;
  let fixture: ComponentFixture<ZonalplannedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZonalplannedComponent]
    });
    fixture = TestBed.createComponent(ZonalplannedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
