import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from './../../redux/app.reducer';
import * as ProjectActions from '../../redux/projects/projects.actions';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {

  textField: FormControl;

  constructor(
    private store: Store<AppState>
  ) {
    this.textField = new FormControl('', [Validators.required]);
  }

  saveTodo() {
    if (this.textField.valid) {
      const text: string = this.textField.value;
      const action = new ProjectActions.AddTodoAction(text.trim());
      this.store.dispatch(action);
      this.textField.setValue('', { emitEvent: false });
    }
  }

}
