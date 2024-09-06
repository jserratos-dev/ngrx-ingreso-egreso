import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore, 
    private authService: AuthService
  ) { 

  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user?.uid;
    const { descripcion, monto, tipo} = ingresoEgreso;
    console.log(uid)
    return this.firestore.doc(`${ uid }/ingresos-egresos`)
      .collection('items')
      .add( {descripcion, monto, tipo});
      
  }

  initIngresosEgresosListener(uid:string) {
    return this.firestore.collection(`${ uid }/ingresos-egresos/items`)
    // .valueChanges()
    .snapshotChanges()
    .pipe(
      map( snapshot => {
        return snapshot.map( doc => {
          // console.log(doc.payload.doc)s
          const data:any = doc.payload.doc.data()
          return {
            uid: doc.payload.doc.id,
            ...data
          }
        })
      })
    )
  }

  borrarIngresoEgreso(uidItem: string) {
    const uid = this.authService.user?.uid;

   return  this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete();
  }
}
