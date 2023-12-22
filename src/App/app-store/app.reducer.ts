import {combineReducers, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {cloneAndRemoveState, cloneState, identityReducerFactory} from "./app.util";
import {ComponentStatus, statusReducer} from "../components/Status/store/status.reducer";

export interface AppState {
    user: { abc: string };
    status: EntityState<ComponentStatus>
}

export interface TestState {
    status: EntityState<ComponentStatus>;
}

export const createAppReducer = <T>(initialState: T) => {
    return createSlice({
        name: '[APP]',
        initialState: initialState,
        reducers: {
            SET_STATE: (state: any, action: PayloadAction<{ state: any; stateKeys: string[] }>) => {
                return cloneState(state, action.payload.state, action.payload.stateKeys);
            },
            REMOVE_STATE: (state, action: PayloadAction<string[]>) => {
                return cloneAndRemoveState(state, action.payload);
            }
        }
    });
};

export const {SET_STATE, REMOVE_STATE} = createAppReducer<{}>({}).actions;

export const rootReducers = combineReducers<AppState>({
    user: identityReducerFactory<{ abc: string }>({abc: "1"}),
    status: statusReducer
});

