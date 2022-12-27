import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AlertService } from '../../admin-shared/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
@Input() 

delay = 5000;
public text = '';
public type = 'success';
alertSub: Subscription | null = null;

constructor(private alertSevice: AlertService){}

ngOnInit(): void {
  this.alertSub = this.alertSevice.alert$.subscribe(alert=>{
    this.text = alert.text
    this.type = alert.type

    const timeout = setTimeout(
      ()=>{
        clearTimeout(timeout);
        this.text = '';
      }, 
      this.delay)
  })
}

ngOnDestroy(): void {
  if(this.alertSub)this.alertSub.unsubscribe
}

}
