import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Alert } from "src/app/shared/interfaces";

@Injectable()
export class AlertService{
    public alert$ = new Subject<Alert>()

    success(text: string){
        this.alert$.next({type: 'success', text})
    }
    warn(text: string){
        this.alert$.next({type: 'warn', text})
    }
    danger(text: string){
        this.alert$.next({type: 'danger', text})
    }
}