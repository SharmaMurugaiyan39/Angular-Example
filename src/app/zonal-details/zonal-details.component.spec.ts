import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonalDetailsComponent } from './zonal-details.component';

describe('ZonalDetailsComponent', () => {
  let component: ZonalDetailsComponent;
  let fixture: ComponentFixture<ZonalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZonalDetailsComponent]
    });
    fixture = TestBed.createComponent(ZonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
