import { createReducer, on } from "@ngrx/store";
import { setItems, unsetItems } from "./ingreso-egreso.actions";
import { IngresoEgreso } from "../models/ingreso-egreso.model";

export interface State {
    items: IngresoEgreso[]
}

export  const initialState: State = {
    items:[]
}

export const ingresoEgresoReducer = createReducer(
    initialState,
    on(setItems, (state, ingresoEgreso) => ({ ...state, items: [ ...ingresoEgreso.items ] })),
    on(unsetItems, (state) => ({ ...state, items: [] })),

);

