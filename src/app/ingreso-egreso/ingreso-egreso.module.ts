import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducers';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { RouterModule } from '@angular/router';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    BaseChartDirective,
    SharedModule,
    DashboardRoutesModule

  ],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
})
export class IngresoEgresoModule { }
