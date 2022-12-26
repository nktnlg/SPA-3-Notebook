import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../admin/admin-shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styles: [
  ]
})
export class MainLayoutComponent {

  constructor(private router: Router, private auth: AuthService){}

  goToAdmin(){
    if (this.auth.token) {this.router.navigate(['admin', 'dashboard'])} 
    else {this.router.navigate(['admin', 'login'])}
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth'})
  }

}
