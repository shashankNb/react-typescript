import {Dictionary, EntityId, EntityState} from "@reduxjs/toolkit";

export function selectIds<T>(state: EntityState<T>): EntityId[] {
    return state && state.ids;
}

export function selectEntities<T>(state: EntityState<T>): Dictionary<T> {
    return state && state.entities;
}

export function selectAll<T>(state: EntityState<T>): (T | undefined)[]{
    return state && state.ids && (state.ids as (number | string)[]).map(id => state.entities && state.entities[id]);
}

export function selectTotal<T>(state: EntityState<T>): number {
    return state && state.ids && state.ids.length;
}
