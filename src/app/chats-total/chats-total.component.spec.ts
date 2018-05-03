import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsTotalComponent } from './chats-total.component';

describe('ChatsTotalComponent', () => {
  let component: ChatsTotalComponent;
  let fixture: ComponentFixture<ChatsTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
