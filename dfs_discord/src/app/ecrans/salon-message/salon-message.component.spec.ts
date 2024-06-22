import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonMessageComponent } from './salon-message.component';

describe('SalonMessageComponent', () => {
  let component: SalonMessageComponent;
  let fixture: ComponentFixture<SalonMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalonMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
