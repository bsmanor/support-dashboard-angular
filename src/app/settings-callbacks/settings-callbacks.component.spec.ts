import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCallbacksComponent } from './settings-callbacks.component';

describe('SettingsCallbacksComponent', () => {
  let component: SettingsCallbacksComponent;
  let fixture: ComponentFixture<SettingsCallbacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCallbacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCallbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
