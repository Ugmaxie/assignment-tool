import { Action } from '@ngrx/store';
import { Developer } from './developers.model';

export const ADD_DEVELOPER    = '[DEVELOPER] add';
export const DELETE_DEVELOPER = '[DEVELOPER] delete';
export const TOGGLE_DEVELOPER = '[DEVELOPER] toggle';
export const UPDATE_DEVELOPER = '[DEVELOPER] update';
export const POPULATE_DEVELOPERS  = '[DEVELOPER] populate';
export const CLEAR_COMPLETED_DEVELOPER = '[DEVELOPER] clear completed';
export const COMPLETE_ALL_DEVELOPER = '[DEVELOPER] complete all';

export class AddDeveloperAction implements Action {
  readonly type = ADD_DEVELOPER;
  public id: number;

  constructor(
    public text: string
  ) {
    this.id = Math.random();
  }
}

export class PopulateDevelopersAction implements Action {
  readonly type = POPULATE_DEVELOPERS;

  constructor(
    public projects: Developer[]
  ) {}
}

export class DeleteDeveloperAction implements Action {
  readonly type = DELETE_DEVELOPER;

  constructor(
    public id: number
  ) {}
}

export class ToggleAction implements Action {
  readonly type = TOGGLE_DEVELOPER;

  constructor(
    public id: number
  ) {}
}

export class UpdateAction implements Action {
  readonly type = UPDATE_DEVELOPER;

  constructor(
    public id: number,
    public text: string,
  ) {}
}

export class ClearCompletedAction implements Action {
  readonly type = CLEAR_COMPLETED_DEVELOPER;
}

export class CompletedAllAction implements Action {
  readonly type = COMPLETE_ALL_DEVELOPER;
}

export type DeveloperActionType =
AddDeveloperAction |
PopulateDevelopersAction |
ToggleAction |
DeleteDeveloperAction |
UpdateAction |
ClearCompletedAction |
CompletedAllAction;
