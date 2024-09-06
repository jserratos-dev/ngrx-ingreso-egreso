import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as  ingresoEgresoActions  from '../ingreso-egreso/ingreso-egreso.actions';

import { AppState } from '../app.reducer';
import { filter, map, Subscription } from 'rxjs';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Usuario } from '../models/usuario.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs!: Subscription;
  subsIngresosEgresos!: Subscription;
  constructor( 
    private store: Store<AppState>,
    private ingresoEgresoService : IngresoEgresoService
  ) {
  }
  
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.subsIngresosEgresos.unsubscribe();
  }

  ngOnInit(): void {

  this.userSubs =  this.store.select('auth')
            .pipe(
              filter( auth  => auth.user != null),
              map(auth => auth.user as Usuario)  
            )
            .subscribe( ( user: Usuario ) => {
            this.subsIngresosEgresos = this.ingresoEgresoService.initIngresosEgresosListener( user.uid )
                .subscribe( ingresoEgresos => {
                this.store.dispatch( ingresoEgresoActions.setItems({items: ingresoEgresos}) )
                  console.log(ingresoEgresos)
                })
            })
  }
}
