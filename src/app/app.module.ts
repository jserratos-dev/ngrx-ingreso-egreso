import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

//NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';


//Firebase

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
//Modulos
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AuthModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
     maxAge: 25, 
     logOnly: environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
