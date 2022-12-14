import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent implements OnInit {
  retry = false;
  load = false;
  queryMessage = '';
  form!: FormGroup;

  constructor(
    public auth: AuthService, 
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params)=>{
      if(params['sessionExpired']){
        this.queryMessage = 'SESSION EXPIRED, LOGIN AGAIN'
      }

    })

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    if (this.form.invalid)return;
    this.load = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    }
    //проверь новую лексику на колбеки
    this.auth.login(user).subscribe(()=>{
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.load = false
    }, ()=>{this.retry = true;this.load = false})
    

  };


}
