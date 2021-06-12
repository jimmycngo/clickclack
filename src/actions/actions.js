import * as types from '../constants/actionTypes';

export const currentTextActionCreator = input => ({
  type: types.CURRENT_TEXT,
  payload: input,
});

export const displayTextActionCreator = input => ({
  type: types.DISPLAY_TEXT,
  payload: input,
});

export const clearTextActionCreator = input => ({
  type: types.CLEAR_TEXT,
  payload: input,
});

export const correctActionCreator = input => ({
  type: types.TEXT_CORRECT,
  payload: input,
});

export const incorrectActionCreator = input => ({
  type: types.TEXT_INCORRECT,
  payload: input,
});

export const deleteActionCreator = input => ({
  type: types.DELETE_TEXT,
  payload: input,
});

export const changeModeActionCreator = input => ({
  type: types.CHANGE_MODE,
  payload: input,
});