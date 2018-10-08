import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from 'rxjs/observable';
import { TodoItem } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private todosRef: AngularFirestoreCollection<TodoItem>;
  todos: Observable<TodoItem[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.todosRef = afs.collection<TodoItem>('todos', ref => ref.orderBy('lastUpdate', 'desc'));
    this.todos = this.todosRef.valueChanges();
  }

  createTodoItem(item: TodoItem) {
    this.todosRef.add(item);
  }

  updateTodoItem(id, property, value) {
    this.todosRef.doc(id).update({[property]: value});
  }

  getAllTodoItems(): Observable<TodoItem[]> {
    return this.todos;
  }

}
