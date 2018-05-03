import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsSatisfactionComponent } from './chats-satisfaction.component';

describe('ChatsSatisfactionComponent', () => {
  let component: ChatsSatisfactionComponent;
  let fixture: ComponentFixture<ChatsSatisfactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsSatisfactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsSatisfactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
