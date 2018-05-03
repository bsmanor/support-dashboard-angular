import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsOnlineComponent } from './chats-online.component';

describe('ChatsOnlineComponent', () => {
  let component: ChatsOnlineComponent;
  let fixture: ComponentFixture<ChatsOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
