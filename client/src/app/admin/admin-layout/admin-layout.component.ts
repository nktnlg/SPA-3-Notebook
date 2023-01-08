import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../admin-shared/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styles: [
  ]
})
export class AdminLayoutComponent {
  dropdown = false;
  constructor(private router: Router, public auth: AuthService){
  }

  goToMain(){
    this.dropdown = false;
    this.router.navigate(['/']);
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth'})
  }

  goToDahboard(){
    this.dropdown = false;
    this.router.navigate(['/admin', 'dashboard']);
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth'})
  }

  goToCreate(){
    this.dropdown = false;
    this.router.navigate(['/admin', 'create']);
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth'})
  }

  logout(event: Event){
    this.dropdown = false;
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
    
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth'})
  }

  toggleDropdown(){
    this.dropdown = !this.dropdown
  }

}
