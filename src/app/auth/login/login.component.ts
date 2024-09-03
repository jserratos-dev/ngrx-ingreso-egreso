import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';


import { AuthService } from '../../services/auth.service';
import * as ui from '../../shared/ui.actions';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit,  OnDestroy{
  formLogin: FormGroup;
  isLoading: boolean = false;

  uiSuscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store:Store<AppState>

  ) {
    this.formLogin = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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

  loginUsuario() {

    if(this.formLogin.invalid) return;
    this.store.dispatch( ui.isLoading() )
    const { email, password } = this.formLogin.value;
    this.authService.loginUsuario(email, password).then(credenciales => {
      console.log(credenciales);
      // Swal.close();
      this.store.dispatch( ui.stopLoading());
      this.router.navigateByUrl('/');
    })
    .catch(err => {
      this.store.dispatch( ui.stopLoading() );
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    })

  }

}
