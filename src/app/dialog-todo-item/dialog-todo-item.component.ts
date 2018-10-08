import { TodoItem } from './../models/todo';
import { TodosService } from './../services/todos.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-dialog-todo-item',
  templateUrl: './dialog-todo-item.component.html',
  styleUrls: ['./dialog-todo-item.component.css']
})
export class DialogTodoItemComponent implements OnInit {

  todoItem: TodoItem = {
    title: '',
    content: '',
    updates: [],
    lastUpdate: '',
    createdBy: '',
    createdAtDate: '',
    status: 'todo'
  };

  constructor(
    private todosService: TodosService,
    public dialogRef: MatDialogRef<DialogTodoItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTodoItem(todoItem: TodoItem) {
    todoItem.createdAtDate = (new Date().getTime() / 1000).toString();
    todoItem.lastUpdate = (new Date().getTime() / 1000).toString();
    todoItem.createdBy = 'name';
    this.todosService.createTodoItem(todoItem);
  }

}
