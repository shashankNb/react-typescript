import { createSelector } from "reselect";
import { AppState } from "../app.reducer";

export interface DrillHistoryData {
    formId: string;
    url: string;
    backBtnLabel: string;
}