import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatScheduleWeeklyComponent } from './chat-schedule-weekly.component';

describe('ChatScheduleWeeklyComponent', () => {
  let component: ChatScheduleWeeklyComponent;
  let fixture: ComponentFixture<ChatScheduleWeeklyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatScheduleWeeklyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatScheduleWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
