import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbacksScheduleComponent } from './callbacks-schedule.component';

describe('CallbacksScheduleComponent', () => {
  let component: CallbacksScheduleComponent;
  let fixture: ComponentFixture<CallbacksScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallbacksScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbacksScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
