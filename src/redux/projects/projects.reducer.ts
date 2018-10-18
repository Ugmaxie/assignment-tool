import { Project } from './projects.model';
import * as TodoActions from './projects.actions';

const initialState: Project[] = [];

export function ProjectssReducer(state: Project[] = initialState, action: TodoActions.TodoActionType) {
  switch (action.type) {
    case TodoActions.ADD_PROJECT: {
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
          developers: []
        }
      ];
    }
    case TodoActions.POPULATE_PROJECTS: {
      return action.projects;
    }
    case TodoActions.TOGGLE_PROJECT: {
      return state.map(todo => {
        if (action.id === todo.id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }else {
          return todo;
        }
      });
    }
    case TodoActions.DELETE_PROJECT: {
      return state.filter(todo => action.id !== todo.id );
    }
    case TodoActions.UPDATE_PROJECT: {
      return state.map(todo => {
        if (action.id === todo.id) {
          return {
            ...todo,
            text: action.text,
            developers: action.developers
          };
        }else {
          return todo;
        }
      });
    }
    case TodoActions.CLEAR_COMPLETED_PROJECT: {
      return state.filter(todo => !todo.completed );
    }
    case TodoActions.COMPLETE_ALL_PROJECT: {
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => {
        return {
          ...todo,
          completed: !areAllMarked
        };
      });
    }
    default: {
      return state;
    }
  }
}
