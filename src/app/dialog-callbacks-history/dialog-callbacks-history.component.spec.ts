import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCallbacksHistoryComponent } from './dialog-callbacks-history.component';

describe('DialogCallbacksHistoryComponent', () => {
  let component: DialogCallbacksHistoryComponent;
  let fixture: ComponentFixture<DialogCallbacksHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCallbacksHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCallbacksHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
