import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as ProjectActions from '../redux/projects/projects.actions';
import * as DeveloperActions from '../redux/developers/developers.actions';
import * as FilterActions from '../redux/filter/filter.actions';
import { AppState } from './../redux/app.reducer';
import { Project } from '../redux/projects/projects.model';
import { Developer } from '../redux/developers/developers.model';
import { getProjectsStateCompleted, getVisibleProjects } from '../redux/projects/projects.selectors';
import { getDevelopersStateCompleted, getVisibleDevelopers } from '../redux/developers/developers.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  projects: Project[] = [];
  developers: Developer[] = [];
  checkFieldProjects = new FormControl();
  checkFieldDevelopers = new FormControl();

  activeProjects: number;
  countProjectsAll = 0;
  countProjectsSales = 0;
  countProjectsProgress = 0;
  countProjectsClosed = 0;

  assignedDevelopers: number;
  countDevelopers: number;

  currentFilter: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.populateTodos();
    this.updateDataset();
    this.readParams();
    this.readStatesCompleted();
    this.readFilterState();
  }

  private populateTodos() {
    const projects: Project[] = JSON.parse(localStorage.getItem('angular-ngrx-projects') || '[]');
    this.store.dispatch(new ProjectActions.PopulateTodosAction(projects));

    const developers: Developer[] = JSON.parse(localStorage.getItem('angular-ngrx-developers') || '[]');
    this.store.dispatch(new DeveloperActions.PopulateDevelopersAction(developers));
  }

  private updateDataset() {
    this.store.select('projects')
      .subscribe(projects => {
        this.projects = projects;
        localStorage.setItem('angular-ngrx-projects', JSON.stringify(projects));
        this.activeProjects = projects.filter(t => !t.completed).length;
        this.countProjectsAll = projects.length;
        this.countProjectsProgress = this.countProjectsAll;
        this.countProjectsClosed = this.countProjectsAll - this.countProjectsProgress - this.countProjectsSales;

        console.log('projects:', this.projects);
      });

    this.store.select('developers')
    .subscribe(developers => {
      this.developers = developers;
      localStorage.setItem('angular-ngrx-developers', JSON.stringify(developers));
      this.assignedDevelopers = developers.filter(t => t.completed).length;
      this.countDevelopers = developers.length;

      console.log('developers:', this.developers);
    });
  }

  private setFilter(filter: string) {
    switch (filter) {
      case 'active': {
        this.store.dispatch(new FilterActions.SetFilterAction('SHOW_ACTIVE'));
        break;
      }
      case 'completed': {
        this.store.dispatch(new FilterActions.SetFilterAction('SHOW_COMPLETED'));
        break;
      }
      default: {
        this.store.dispatch(new FilterActions.SetFilterAction('SHOW_ALL'));
        break;
      }
    }
  }

  private readStatesCompleted() {
    this.store.select(getProjectsStateCompleted)
      .subscribe(status => {
        this.checkFieldProjects.setValue(status);
      });

    this.store.select(getDevelopersStateCompleted)
      .subscribe(status => {
        this.checkFieldDevelopers.setValue(status);
      });
  }

  private readParams() {
    this.route.params
      .subscribe(params => {
        this.setFilter(params.filter);
      });
  }




  clearCompletedProject() {
    const action = new ProjectActions.ClearCompletedAction();
    this.store.dispatch(action);
  }

  clearCompletedDeveloper() {
    const action = new DeveloperActions.ClearCompletedAction();
    this.store.dispatch(action);
  }

  completedAllProjects() {
    const action = new ProjectActions.CompletedAllAction();
    this.store.dispatch(action);
  }

  completedAllDevelopers() {
    const action = new DeveloperActions.CompletedAllAction();
    this.store.dispatch(action);
  }

  private readFilterState() {
    this.store.select('filter')
      .subscribe(fitler => {
        this.currentFilter = fitler;
      });
  }
}
