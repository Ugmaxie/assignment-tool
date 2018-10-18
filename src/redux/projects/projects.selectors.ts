import { createSelector } from '@ngrx/store';
import { AppState } from './../app.reducer';
import { Project } from './projects.model';

export const getState  = (state: AppState) => state;
export const getFilter = (state: AppState) => state.filter;
export const getProjects  = (state: AppState) => state.projects;

export const getVisibleProjects = createSelector(
  getProjects,
  getFilter,
  (projects: Project[], filter: string) => {
    switch (filter) {
      default:
      case 'SHOW_ALL':
        return projects;
      case 'SHOW_COMPLETED':
        return projects.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return projects.filter(t => !t.completed);
    }
  }
);

export const getProjectsStateCompleted = createSelector(getProjects, (projects) => {
  return projects.every(project => project.completed);
});
