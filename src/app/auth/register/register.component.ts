import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';

//RXJS
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent implements OnInit, OnDestroy {
 
  public formRegister: FormGroup;
  isLoading : boolean = false;
  uiSuscription!: Subscription;
  
  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>
             ) {
    this.formRegister = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.uiSuscription.unsubscribe();
  }

  ngOnInit(): void {
    this.uiSuscription =  this.store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    })
  }

  crearUsuario() {
    if( this.formRegister.invalid ) return; 
    this.store.dispatch( ui.isLoading() )
    const { nombre,  correo, password } = this.formRegister.value;

    this.authService.crearUsuario(nombre, correo, password ).then( credenciales => {
      console.log(credenciales,"===")
      this.store.dispatch( ui.stopLoading() );
      this.router.navigate(['/']);
    }).catch(err =>{
      this.store.dispatch( ui.stopLoading() );
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    })
  }

}
