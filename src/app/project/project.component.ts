import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from './../../redux/app.reducer';
import { Project } from '../../redux/projects/projects.model';
import * as ProjectActions from '../../redux/projects/projects.actions';
import { getVisibleDevelopers } from '../../redux/developers/developers.selectors';
import { getVisibleProjects } from '../../redux/projects/projects.selectors';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;

  @ViewChild('textInput') textInput: ElementRef;
  textField: FormControl;
  checkField: FormControl;
  editing: boolean;
  developers = [];
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
        const action = new ProjectActions.ToggleAction(this.project.id);
        this.store.dispatch(action);

        if (state) {
          this.unselectProjectsIfCurrentSelected();
        }
      });
  }

  ngOnInit() {
    this.store.select(getVisibleDevelopers)
      .subscribe(developers => {
        developers.forEach(developer => {
            if (this.project.developers.includes(developer.id) && !this.developers.includes(developer.text)) {

              this.developers.push(developer.text);
            }
          }
        );
      });

    this.textField.setValue(this.project.text);
    this.checkField.setValue(this.project.completed, {emitEvent: false});
  }

  unselectProjectsIfCurrentSelected() {
     this.projects.forEach(project => {
       if (this.project.id !== project.id && project.completed) {
         const action = new ProjectActions.ToggleAction(project.id);
         this.store.dispatch(action);
       }
     });
  }

  updateText() {
    if (this.textField.valid && this.editing) {
      const id = this.project.id;
      const newText: string = this.textField.value;
      const developers = [];
      const action = new ProjectActions.UpdateAction(id, newText.trim(), developers);
      this.store.dispatch(action);
      this.editing = false;
    }
  }

  activeEditModeProject() {
    this.editing = true;
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }

  deleteProject() {
    const id = this.project.id;
    const action = new ProjectActions.DeleteTodoAction(id);
    this.store.dispatch(action);
  }
}
