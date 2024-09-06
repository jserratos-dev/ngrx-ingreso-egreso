import { createAction, props } from "@ngrx/store";
import { IngresoEgreso } from "../models/ingreso-egreso.model";

export const unsetItems = createAction('[IngresoEgreso] UnSet Items');
export const setItems = createAction('[IngresoEgreso] SetItems',
    props<{ items: IngresoEgreso[] }>()
);

