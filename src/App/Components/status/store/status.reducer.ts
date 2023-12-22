import { EntityState, PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export enum DataStatus {
    Loading = 'Loading',
    Loaded = 'Loaded',
    ErrorState = 'ErrorState'
}

export const FETCH_STATUS = {
    LOADING: {
        status: DataStatus.Loading,
        errorCode: 0,
        errorMsg: '',
        errorStatus: 0
    },
    LOADED: {
        status: DataStatus.Loaded,
        errorCode: 0,
        errorMsg: '',
        errorStatus: 0
    },
    ERROR: (err: any): Status => {
        return {
            status: DataStatus.ErrorState,
            errorCode: err.code,
            errorMsg: err.message,
            errorStatus: err.response ? err.response.status : 503,
            errorId: err.errorId || null // change the object according to your response
        }
    }
}

export interface Status {
    status: DataStatus;
    errorCode: number | string;
    errorMsg: string;
    errorStatus: number;
    errorId?: string | number;
}

export interface ComponentStatus {
    id: number | string;
    status: Status
}

export function createComponentStatus(id: number | string, status: Status): ComponentStatus {
    return { id, status }
}

export const componentStatusAdapter = createEntityAdapter<ComponentStatus>();

const initialState = componentStatusAdapter.getInitialState();

const statusSlice = createSlice({
    name: '[STATUS]',
    initialState: initialState,
    reducers: {
        UPSERT_STATUS: (state: EntityState<ComponentStatus>, action: PayloadAction<{ stateKeys: string[]; status: ComponentStatus }>) => {
            return componentStatusAdapter.upsertOne(state, action.payload.status);
        },
        REMOVE_STATUS: (state: EntityState<ComponentStatus>, action: PayloadAction<{ stateKeys: string, id: string }>) => {
            return componentStatusAdapter.removeOne(state, action.payload.id);
        }
    }
});

export const { UPSERT_STATUS, REMOVE_STATUS } = statusSlice.actions;
export const statusReducer = statusSlice.reducer;
