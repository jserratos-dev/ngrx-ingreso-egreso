import { Component, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: ``
})
export class DetalleComponent  implements OnDestroy{
  ingresosEgresos: IngresoEgreso[] = [];
  subsIngresosEgresos!: Subscription;

  constructor( private store:Store<AppState>, private ingresoEgresoService: IngresoEgresoService) {
   this.subsIngresosEgresos =  this.store.select('ingresosEgresos').subscribe( ingresosEgresos => {
      this.ingresosEgresos = ingresosEgresos.items ;
    })
  }

  ngOnDestroy(): void {
    this.subsIngresosEgresos.unsubscribe();
  }
  borrar(uid: string) {
    console.log(uid)
    this.ingresoEgresoService.borrarIngresoEgreso(uid).then((res) =>{
      Swal.fire('Borrado', `Item ${uid} borrado correctamente`, 'success')
    })
    .catch( err => Swal.fire('Error', `${err.message}`, 'error'));
  } 
}
