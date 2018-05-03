import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsQueuedComponent } from './chats-queued.component';

describe('ChatsQueuedComponent', () => {
  let component: ChatsQueuedComponent;
  let fixture: ComponentFixture<ChatsQueuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsQueuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsQueuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
