import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) {
    this.formLogin = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  loginUsuario() {

    if(this.formLogin.invalid) return;
    Swal.fire({
      title: "Espere por favor",
      didOpen: () => {
        Swal.showLoading();
      }
    })
    const { email, password } = this.formLogin.value;
    this.authService.loginUsuario(email, password).then(credenciales => {
      console.log(credenciales);
      Swal.close();
      this.router.navigateByUrl('/');
    })
    .catch(err => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    })

  }

}
