import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform( items: IngresoEgreso[]): IngresoEgreso[] {

    const itemsClonados = [...items];

    return itemsClonados.sort( (a, b) => {
      // console.log(a)
      if (a.tipo === 'ingreso' && b.tipo !== 'ingreso') {
        return -1;
      } else if (a.tipo !== 'ingreso' && b.tipo === 'ingreso') {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
