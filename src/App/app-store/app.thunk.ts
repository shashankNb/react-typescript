import {createAsyncThunk, Dispatch} from "@reduxjs/toolkit";
import {AppActionFactory, FetchState} from "./app.action";
import {AppState} from "./app.reducer";
import axios, {Axios, AxiosError} from "axios";
import {createComponentStatus, FETCH_STATUS} from "../components/Status/store/status.reducer";
import {StatusActionFactory} from "../components/Status/store/status.action";

export const FETCH_DATA = createAsyncThunk<void, FetchState, { dispatch: Dispatch, state: AppState }>('[FETCH_DATA]',
    async (payload: FetchState, {dispatch}) => {

        const hasStatusInfo = !!payload.statusId && !!payload.statusStateKeys;

        try {

            if (hasStatusInfo) {
                const componentStatus = createComponentStatus(payload.statusId || '', FETCH_STATUS.LOADING);
                dispatch(StatusActionFactory.upsertStatus({
                    stateKeys: payload.statusStateKeys || [],
                    status: componentStatus
                }));
            }

            const response = await axios.get(payload.url);

            if (hasStatusInfo) {
                const componentStatus = createComponentStatus(payload.statusId || '', FETCH_STATUS.LOADED);
                dispatch(StatusActionFactory.upsertStatus({
                    stateKeys: payload.statusStateKeys || [],
                    status: componentStatus
                }));
            }

            if (payload.onSuccess) {
                payload.onSuccess(response);
            }

            if (payload.stateKeys) {
                const data = payload.dataTransformFn
                    ? payload.dataTransformFn(response.data)
                    : response.data;
                dispatch(AppActionFactory.setState({stateKeys: payload.stateKeys, state: data}));
            }

        } catch (e: any) {
            if (payload.onError) {
                payload.onError(e);
            }
            if (hasStatusInfo) {
                const componentStatus = createComponentStatus(payload.statusId || '', FETCH_STATUS.ERROR(e));
                dispatch(
                    StatusActionFactory.upsertStatus({
                        stateKeys: payload.statusStateKeys || [],
                        status: componentStatus
                    })
                )
            }
        }
    }
);
