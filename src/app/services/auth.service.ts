import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { unsetItems } from '../ingreso-egreso/ingreso-egreso.actions';
import * as authActions from '../auth/auth.actions';

import { map, Subscription } from 'rxjs';

import { Usuario } from '../models/usuario.models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private _user!: Usuario | null ;

  constructor( 
    public auth: AngularFireAuth, 
    public firestore: AngularFirestore,
    private store: Store<AppState>  
  ) { }

  get user() {
    return this._user;
  }

  initAuthListener(){
    this.auth.authState.subscribe( fuser => {

      if(fuser) {
        console.log('=====USUARIO LOGUEADO=====',fuser)
    this.userSubscription =    
        this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges()
        .subscribe( (firestoreUser) => {
          console.log("====DOCUMENTO======",firestoreUser)
          const user = Usuario.fromFirebase( firestoreUser);
          this._user = user;
          this.store.dispatch( authActions.setUser({ user  }));
        })
        
      }else {
        if(this.userSubscription) {
          this.userSubscription.unsubscribe();
        }
        this._user = null;
        this.store.dispatch( authActions.unSetUser() );
        this.store.dispatch( unsetItems() )

      }
    })
  }

  crearUsuario( nombre:string, email:string, password:string ) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( fbUser => {

        if (!fbUser.user?.uid || !fbUser.user?.email) {
          throw new Error('UID or email is undefined');
        }
      
        const  newUser  = new Usuario(fbUser.user.uid, nombre, fbUser.user.email);

        return this.firestore.doc(`${fbUser.user.uid }/usuario`).set({ ...newUser });

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
