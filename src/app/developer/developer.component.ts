import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from './../../redux/app.reducer';
import { Developer } from '../../redux/developers/developers.model';
import { getVisibleProjects } from '../../redux/projects/projects.selectors';
import * as DeveloperActions from '../../redux/developers/developers.actions';
import * as ProjectActions from '../../redux/projects/projects.actions';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  @Input() developer: Developer;

  @ViewChild('textInput') textInput: ElementRef;
  textField: FormControl;
  checkField: FormControl;
  editing: boolean;
  projects = [];

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select(getVisibleProjects)
      .subscribe(projects => {
        this.projects = projects;
      });

    this.textField = new FormControl('', [Validators.required]);
    this.checkField = new FormControl(false);
    this.checkField.valueChanges
      .subscribe(state => {
        const action = new DeveloperActions.ToggleAction(this.developer.id);
        this.store.dispatch(action);
        this.assignDeveloperToProject(state);
      });
  }

  assignDeveloperToProject(state) {
    this.projects
      .filter(project => project.completed)
      .forEach(project => {
        const projectDevelopersList = project.developers;

        if (!state) {
          const developerIndex = projectDevelopersList.indexOf(this.developer.id);
          if (developerIndex > -1) {
            projectDevelopersList.splice(developerIndex, 1);
          }
        }

        if (state) {
          const i = projectDevelopersList.length;

          if (!projectDevelopersList.includes(this.developer.id)) {
            projectDevelopersList[i] = this.developer.id;
          }
        }

        const newText = project.text;
        const actionProject = new ProjectActions.UpdateAction(project.id, newText.trim(), projectDevelopersList);
        this.store.dispatch(actionProject);
      });
  }

  ngOnInit() {
    this.textField.setValue(this.developer.text);
    this.checkField.setValue(this.developer.completed, {emitEvent: false});
  }

  updateText() {
    if (this.textField.valid && this.editing) {
      const id = this.developer.id;
      const newText: string = this.textField.value;
      const action = new DeveloperActions.UpdateAction(id, newText.trim());
      this.store.dispatch(action);
      this.editing = false;
    }
  }

  activeEditModeDeveloper() {
    this.editing = true;
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }

  deleteTodoDeveloper() {
    const id = this.developer.id;
    const action = new DeveloperActions.DeleteDeveloperAction(id);
    this.store.dispatch(action);
  }
}
