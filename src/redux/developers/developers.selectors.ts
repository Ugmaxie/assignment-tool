import { createSelector } from '@ngrx/store';
import { AppState } from './../app.reducer';
import { Developer } from './developers.model';

export const getState  = (state: AppState) => state;
export const getFilter = (state: AppState) => state.filter;
export const getDevelopers  = (state: AppState) => state.developers;

export const getVisibleDevelopers = createSelector(
  getDevelopers,
  getFilter,
  (developers: Developer[], filter: string) => {
    switch (filter) {
      default:
      case 'SHOW_ALL':
        return developers;
      case 'SHOW_COMPLETED':
        return developers.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return developers.filter(t => !t.completed);
    }
  }
);

export const getDevelopersStateCompleted = createSelector(getDevelopers, (developers) => {
  return developers.every(developer => developer.completed);
});
