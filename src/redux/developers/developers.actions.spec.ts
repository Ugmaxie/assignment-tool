import * as TodoActions from './projects.actions';

describe('Redux: TodoActions', () => {

  describe('Test for AddTodoAction', () => {

    it('should return an action with random id', () => {
      const action = new TodoActions.AddTodoAction('new todo');
      expect(action.type).toEqual(TodoActions.ADD_PROJECT);
      expect(action.id).toBeGreaterThan(0);
    });

  });

  describe('Test for PopulateTodosAction', () => {

    it('should return an action with todos', () => {
      const action = new TodoActions.PopulateTodosAction([]);
      expect(action.type).toEqual(TodoActions.POPULATE_PROJECTS);
      expect(action.projects).toEqual([]);
    });

  });

  describe('Test for DeleteTodoAction', () => {

    it('should return an action with an id', () => {
      const action = new TodoActions.DeleteTodoAction(1);
      expect(action.type).toEqual(TodoActions.DELETE_PROJECT);
      expect(action.id).toEqual(1);
    });

  });

  describe('Test for ToggleAction', () => {

    it('should return an action with an id', () => {
      const action = new TodoActions.ToggleAction(1);
      expect(action.type).toEqual(TodoActions.TOGGLE_PROJECT);
      expect(action.id).toEqual(1);
    });

  });

  describe('Test for UpdateAction', () => {

    it('should return an action with an id and text', () => {
      const action = new TodoActions.UpdateAction(1, 'new text');
      expect(action.type).toEqual(TodoActions.UPDATE_PROJECT);
      expect(action.id).toEqual(1);
      expect(action.text).toEqual('new text');
    });

  });

  describe('Test for ClearCompletedAction', () => {

    it('should return an action the right type', () => {
      const action = new TodoActions.ClearCompletedAction();
      expect(action.type).toEqual(TodoActions.CLEAR_COMPLETED_PROJECT);
    });

  });

  describe('Test for CompletedAllAction', () => {

    it('should return an action the right type', () => {
      const action = new TodoActions.CompletedAllAction();
      expect(action.type).toEqual(TodoActions.COMPLETE_ALL_PROJECT);
    });

  });

});
