import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatScheduleComponent } from './chat-schedule.component';

describe('ChatScheduleComponent', () => {
  let component: ChatScheduleComponent;
  let fixture: ComponentFixture<ChatScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
