import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChatMessageComponent } from './dialog-chat-message.component';

describe('DialogChatMessageComponent', () => {
  let component: DialogChatMessageComponent;
  let fixture: ComponentFixture<DialogChatMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogChatMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
