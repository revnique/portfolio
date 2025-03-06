import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuckLiteComponent } from './buck-lite.component';

describe('BuckLiteComponent', () => {
  let component: BuckLiteComponent;
  let fixture: ComponentFixture<BuckLiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuckLiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuckLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
