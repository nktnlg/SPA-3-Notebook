import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { FbAuthResponse, User } from "src/app/shared/interfaces";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable({providedIn: 'root'})
export class AuthService {

    public error$: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient){}

    get token():string | null {
        const expDateString: string = localStorage.getItem('fb-token-exp')?.toString() || '0';
        const expDate = new Date(expDateString)
        if (new Date() > expDate){this.logout; return null}
        return localStorage.getItem('fb-token')
    }

    isAuth():boolean {
        return !!this.token;
    }

    login(user: User): Observable<FbAuthResponse>{
        user.returnSecureToken = true;
        localStorage.setItem('username', user.email);
       return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
       .pipe(
        tap(res => this.setToken(res)),
        catchError(this.handleError.bind(this))
       )
    }
    private handleError(err: HttpErrorResponse){
        const {message} = err.error.error; 
        switch(message){
            case 'INVALID_EMAIL':
                this.error$.next('Invalid email')
            break
            case 'INVALID_PASSWORD':
                this.error$.next('Invalid password')
            break
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Email not found')
            break
            default: this.error$.next('Unknown error!')
        
        }

        return throwError(err)
    }

    logout(){
        this.setToken(null)
        localStorage.removeItem('username')

    }



    private setToken(res: FbAuthResponse | null){
        if (res) {
        const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000 )
        localStorage.setItem('fb-token', res.idToken)
        localStorage.setItem('fb-token-exp', expDate.toString())}
        else {localStorage.clear()}
    }


}