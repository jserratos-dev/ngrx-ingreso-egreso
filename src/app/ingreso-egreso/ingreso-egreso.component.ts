import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: ``
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string =  'ingreso';
  cargando: boolean = false;
  loadingSubs!: Subscription;

  constructor( 
    private fb: FormBuilder, 
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>){
    this.ingresoForm = this.fb.group({
      descripcion:['', Validators.required ],
      monto:['', Validators.required ],
    })
  }
  ngOnDestroy(): void {
     this.loadingSubs.unsubscribe();
  }

  ngOnInit(): void {
   this.loadingSubs =  this.store.select('ui').subscribe( ui => { 
      this.cargando = ui.isLoading 
    });
  }

  guardar() {
    if(this.ingresoForm.invalid) return;
    this.store.dispatch( isLoading());
    
    const  { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    console.log('IngresoEgreso Object:', ingresoEgreso);

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
    .then(  (ref) => {
      console.log(ref,"dekdopk")
      this.ingresoForm.reset();
      Swal.fire('Registro creado', descripcion, 'success');
      console.log('Exito!', ref)
      this.store.dispatch( stopLoading() );

    })
    .catch( err =>{
      console.log(err,"dekdopk")

      Swal.fire('Error', err.message, 'error');
      this.store.dispatch( stopLoading() );
      console.log( err)
    });
  }

} 
