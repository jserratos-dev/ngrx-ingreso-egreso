import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: `.cursor { cursor:pointer }`
})
export class SidebarComponent implements OnInit, OnDestroy {

  subsAuth!: Subscription;
  profileName:string  = '';
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {

  }

  ngOnDestroy(): void {
    this.subsAuth.unsubscribe();
  }
  ngOnInit(): void {
      this.subsAuth =  this.store.select('auth')
    .subscribe(({ user }) => {
        this.profileName = user?.nombre || '';
    })
  }

  logout() {
    this.authService.logout().then( (result) => {
      console.log(result)
      this.router.navigateByUrl('/login');
    })


  }

}
