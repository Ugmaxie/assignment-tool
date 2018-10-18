import { ActionReducerMap } from '@ngrx/store';

import { ProjectssReducer } from './projects/projects.reducer';
import { DevelopersReducer } from './developers/developers.reducer';
import { FilterReducer } from './filter/filter.reducer';
import { Project } from './projects/projects.model';
import { Developer } from './developers/developers.model';

export interface AppState {
  projects: Project[];
  developers: Developer[];
  filter: string;
}

export const rootReducer: ActionReducerMap<AppState> = {
  projects: ProjectssReducer,
  developers: DevelopersReducer,
  filter: FilterReducer
};
