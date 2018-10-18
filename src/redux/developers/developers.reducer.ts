import { Developer } from './developers.model';
import * as DeveloperActions from './developers.actions';

const initialState: Developer[] = [];

export function DevelopersReducer(state: Developer[] = initialState, action: DeveloperActions.DeveloperActionType) {
  switch (action.type) {
    case DeveloperActions.ADD_DEVELOPER: {
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    }
    case DeveloperActions.POPULATE_DEVELOPERS: {
      return action.projects;
    }
    case DeveloperActions.TOGGLE_DEVELOPER: {
      return state.map(developer => {
        if (action.id === developer.id) {
          return {
            ...developer,
            completed: !developer.completed
          };
        }else {
          return developer;
        }
      });
    }
    case DeveloperActions.DELETE_DEVELOPER: {
      return state.filter(developer => action.id !== developer.id );
    }
    case DeveloperActions.UPDATE_DEVELOPER: {
      return state.map(developer => {
        if (action.id === developer.id) {
          return {
            ...developer,
            text: action.text
          };
        }else {
          return developer;
        }
      });
    }
    case DeveloperActions.CLEAR_COMPLETED_DEVELOPER: {
      return state.filter(developer => !developer.completed );
    }
    case DeveloperActions.COMPLETE_ALL_DEVELOPER: {
      const areAllMarked = state.every(developer => developer.completed);
      return state.map(developer => {
        return {
          ...developer,
          completed: !areAllMarked
        };
      });
    }
    default: {
      return state;
    }
  }
}
