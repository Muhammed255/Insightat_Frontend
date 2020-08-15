import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMessageDialogComponent } from './validation-message-dialog.component';

describe('ValidationMessageDialogComponent', () => {
  let component: ValidationMessageDialogComponent;
  let fixture: ComponentFixture<ValidationMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
