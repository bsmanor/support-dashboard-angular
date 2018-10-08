import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTodoItemComponent } from './dialog-todo-item.component';

describe('DialogTodoItemComponent', () => {
  let component: DialogTodoItemComponent;
  let fixture: ComponentFixture<DialogTodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTodoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
