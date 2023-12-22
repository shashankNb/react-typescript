import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as _ from 'lodash';
import { AppState, createAppReducer } from "./app.reducer";

export const identityReducerFactory = <T>(initiaState: T) => {
  return createAppReducer<T>(initiaState).reducer;
}

export function pluckState<T>(state: AppState, stateKeys: string[]): T {
  return stateKeys && stateKeys.length > 0
    ? _.get(state, stateKeys.join('.'))
    : state;
}

export function getState<T>(state: AppState, stateKeys: string[]): T {
    return pluckState(state, stateKeys);
}

export const cloneState = (state: AppState, selectorState: any, stateKeys: string[]): any  => {
  const newState = {...state};
  stateKeys = stateKeys || [];
  let nodeState: any = newState;
  for (let i = 0; i < stateKeys.length - 1; i++) {
    nodeState[stateKeys[i]] = {...nodeState[stateKeys[i]]};
    nodeState = nodeState[stateKeys[i]];
  }
  nodeState[stateKeys[stateKeys.length - 1]] = selectorState;

  return nodeState;
}

export const cloneAndRemoveState = (state: any, stateKeys: string[]): any => {
  const newState = {...state};
  let nodeState: any = newState;
  for (let i = 0; i < stateKeys.length - 1; i++) {
    nodeState[stateKeys[i]] = {...nodeState[stateKeys[i]]};
    nodeState = nodeState[stateKeys[i]];
  }
  delete nodeState[stateKeys[stateKeys.length - 1]];
  return nodeState;
}
