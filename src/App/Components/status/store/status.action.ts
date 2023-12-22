import {ComponentStatus, UPSERT_STATUS} from "./status.reducer";

export const StatusActionFactory = {
    upsertStatus: (payload: {stateKeys: string[], status: ComponentStatus}) => UPSERT_STATUS(payload),
    // removeOne: (stateKeys: string[]) => REMOVE_STATUS(stateKeys)
}
