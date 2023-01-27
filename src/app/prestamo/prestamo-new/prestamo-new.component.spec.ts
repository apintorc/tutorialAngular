import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoNewComponent } from './prestamo-new.component';

describe('PrestamoNewComponent', () => {
  let component: PrestamoNewComponent;
  let fixture: ComponentFixture<PrestamoNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
