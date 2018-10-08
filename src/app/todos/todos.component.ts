import { DialogTodoItemComponent } from './../dialog-todo-item/dialog-todo-item.component';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { TodoItem } from '../models/todo';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Observable<TodoItem[]>;

  constructor(
    private todosService: TodosService,
    public dialog: MatDialog
  ) {
    this.todos = this.todosService.getAllTodoItems();
  }

  ngOnInit() {
  }

  openNewTodoDialog() {
    this.dialog.open(DialogTodoItemComponent, {
      width: '500px',
      height: '600px'
    });
  }

  updateTodoItem(id, property, value) {
    this.updateTodoItem(id, property, value);
  }

}
