import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import {tap} from "rxjs/operators" 
import { AuthService } from "../admin/admin-shared/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!!this.auth.token){
            req = req.clone({
                setParams: {
                    auth: this.auth.token
                }
            })
        }
        return next.handle(req)
        .pipe(
            catchError((err: HttpErrorResponse)=>{
                console.log('auth.interceptor.ts error', err)
                if (err.status === 401){
                    this.auth.logout()
                    this.router.navigate(['/admin', 'login'], {queryParams:{sessionExpired: true}})
                }
                return throwError(err)})
        )
    }
}