import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from './../../redux/app.reducer';
import { Todo } from './../../redux/todo/todo.model';
import * as TodoActions from './../../redux/todo/todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('textInput') textInput: ElementRef;
  textField: FormControl;
  checkField: FormControl;
  editing: boolean;

  constructor(
    private store: Store<AppState>
  ) {
    this.textField = new FormControl('', [Validators.required]);
    this.checkField = new FormControl(false);
    this.checkField.valueChanges
    .subscribe(state => {
      this.store.dispatch(new TodoActions.ToggleAction(this.todo.id));
    });
  }

  ngOnInit() {
    this.textField.setValue(this.todo.text);
    this.checkField.setValue(this.todo.completed, {emitEvent: false});
  }

  updateText() {
    if (this.textField.valid && this.editing) {
      const id = this.todo.id;
      const newText = this.textField.value;
      this.editing = false;
      this.store.dispatch(new TodoActions.UpdateAction(id, newText));
    }
  }

  activeEditMode() {
    this.editing = !this.editing;
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }

  deleteTodo() {
    const id = this.todo.id;
    this.store.dispatch(new TodoActions.DeleteTodoAction(id));
  }

}
