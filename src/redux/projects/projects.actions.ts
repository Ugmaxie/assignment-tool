import { Action } from '@ngrx/store';
import { Project } from './projects.model';

export const ADD_PROJECT    = '[PROJECT] add';
export const DELETE_PROJECT = '[PROJECT] delete';
export const TOGGLE_PROJECT = '[PROJECT] toggle';
export const UPDATE_PROJECT = '[PROJECT] update';
export const POPULATE_PROJECTS  = '[PROJECT] populate';
export const CLEAR_COMPLETED_PROJECT = '[PROJECT] clear completed';
export const COMPLETE_ALL_PROJECT = '[PROJECT] complete all';

export class AddTodoAction implements Action {
  readonly type = ADD_PROJECT;
  public id: number;
  public developers: number[];

  constructor(
    public text: string
  ) {
    this.developers = [];
    this.id = Math.random();
  }
}

export class PopulateTodosAction implements Action {
  readonly type = POPULATE_PROJECTS;

  constructor(
    public projects: Project[]
  ) {}
}

export class DeleteTodoAction implements Action {
  readonly type = DELETE_PROJECT;

  constructor(
    public id: number
  ) {}
}

export class ToggleAction implements Action {
  readonly type = TOGGLE_PROJECT;

  constructor(
    public id: number
  ) {}
}

export class UpdateAction implements Action {
  readonly type = UPDATE_PROJECT;

  constructor(
    public id: number,
    public text: string,
    public developers: number[]
  ) {}
}

export class ClearCompletedAction implements Action {
  readonly type = CLEAR_COMPLETED_PROJECT;
}

export class CompletedAllAction implements Action {
  readonly type = COMPLETE_ALL_PROJECT;
}

export type TodoActionType =
AddTodoAction |
PopulateTodosAction |
ToggleAction |
DeleteTodoAction |
UpdateAction |
ClearCompletedAction |
CompletedAllAction;
