import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevniqueCalendarComponent } from './revnique-calendar.component';

describe('RevniqueCalendarComponent', () => {
  let component: RevniqueCalendarComponent;
  let fixture: ComponentFixture<RevniqueCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevniqueCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevniqueCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
