import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from './../../redux/app.reducer';
import * as DeveloperActions from '../../redux/developers/developers.actions';

@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.scss']
})
export class AddDeveloperComponent {

  textField: FormControl;

  constructor(
    private store: Store<AppState>
  ) {
    this.textField = new FormControl('', [Validators.required]);
  }

  saveTodo() {
    if (this.textField.valid) {
      const text: string = this.textField.value;
      const action = new DeveloperActions.AddDeveloperAction(text.trim());
      this.store.dispatch(action);
      this.textField.setValue('', { emitEvent: false });
    }
  }

}
