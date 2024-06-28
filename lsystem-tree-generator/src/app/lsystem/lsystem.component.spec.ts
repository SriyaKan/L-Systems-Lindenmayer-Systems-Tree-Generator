import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsystemComponent } from './lsystem.component';

describe('LsystemComponent', () => {
  let component: LsystemComponent;
  let fixture: ComponentFixture<LsystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LsystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
