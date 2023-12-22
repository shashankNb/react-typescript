import {REMOVE_STATE, SET_STATE} from "./app.reducer";
import {RequestMethod} from "../app.model";
import {FETCH_DATA} from "./app.thunk";


export interface FetchState {
    url: string;
    method: RequestMethod;
    params?: { [p: string]: any };
    body?: any;
    stateKeys?: string[];
    dataTransformFn?: (data: any) => any;
    statusId?: string | number;
    statusStateKeys?: string[];
    onSuccess?: (res: any) => any;
    onError?: (err: any) => void;
}

export const AppActionFactory = {
    setState: (payload: { state: any, stateKeys: string[] }) => SET_STATE(payload),
    removeState: (stateKeys: string[]) => REMOVE_STATE(stateKeys),
    fetchData: (payload: FetchState) => FETCH_DATA(payload)
}
