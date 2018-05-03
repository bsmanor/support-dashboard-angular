import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsChatComponent } from './settings-chat.component';

describe('SettingsChatComponent', () => {
  let component: SettingsChatComponent;
  let fixture: ComponentFixture<SettingsChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
