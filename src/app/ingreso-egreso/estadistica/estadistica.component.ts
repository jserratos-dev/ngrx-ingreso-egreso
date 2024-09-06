import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: ``
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  public subsIngresosEgresos!: Subscription;
  ingresos:number = 0;
  egresos:number  = 0;

  totalEgresos:number  = 0;
  totalIngresos:number = 0;

   // Doughnut
   public doughnutChartType: ChartType = 'doughnut';

   public doughnutChartLabels: string[] = [
    'Ingresos',
    'Egresos',
  ];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [ ] },
      // { data: [50, 150, 120] },
      // { data: [250, 130, 70] },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }



  constructor( private store: Store<AppState>) {

  }


  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.subsIngresosEgresos.unsubscribe();
  }
  ngOnInit(): void {
   this.subsIngresosEgresos =  this.store.select('ingresosEgresos')
    .subscribe(({ items }) => {
      this.generarEstadistica( items );
    })
  }

  generarEstadistica( items: IngresoEgreso[]) {

    this.totalEgresos = 0;
    this.totalIngresos = 0;
    this.egresos = 0;
    this.ingresos = 0;

    for( const item  of items ) {

      if(item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos ++;

      }else if(item.tipo === 'egreso') {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }

    }
   
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { 
          data: [this.totalIngresos, this.totalEgresos]  // Aquí agregas tus datos
        }
      ],
    };
    console.log(this.doughnutChartData)
    
  }

}
