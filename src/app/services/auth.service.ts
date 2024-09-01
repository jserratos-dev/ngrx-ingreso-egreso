import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { map } from 'rxjs';
import { Usuario } from '../models/usuario.models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    public auth: AngularFireAuth, 
    public firestore: AngularFirestore
  ) { }

  initAuthListener(){
    this.auth.authState.subscribe( fuser => {
      console.log(fuser)
    })
  }

  crearUsuario( nombre:string, email:string, password:string ) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( fbUser => {

        if (!fbUser.user?.uid || !fbUser.user?.email) {
          throw new Error('UID or email is undefined');
        }
      
        const  newUser  = new Usuario(fbUser.user.uid, nombre, fbUser.user.email);
        return this.firestore.collection('usuarios').add({ ...newUser });

      })
  }



  loginUsuario( email:string, password:string ) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbuser => fbuser != null)
    )
  }
}
