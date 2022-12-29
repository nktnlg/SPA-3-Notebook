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

delay = 6000;
public text = '';
public initial = 'initial'
public type = 'success';
alertSub: Subscription | null = null;

constructor(private alertSevice: AlertService){}

ngOnInit(): void {
  this.alertSub = this.alertSevice.alert$.subscribe(alert=>{
    if(!this.text){
    this.text = alert.text
    this.type = this.initial

    const initialTimeout = setTimeout(
      ()=>{
        clearTimeout(initialTimeout);
        this.type = alert.type;
      }, 
      0)
    
    const fadeoutTimeout = setTimeout(
        ()=>{
          clearTimeout(fadeoutTimeout);
          this.type = this.initial;
        }, 
        this.delay-1000)
    


    const timeout = setTimeout(
      ()=>{
        clearTimeout(timeout);
        this.text = '';
      }, 
      this.delay)
    }else {
      const fadeoutTimeout = setTimeout(
        ()=>{
          clearTimeout(fadeoutTimeout);
          this.type = this.initial;
          const initialTimeout = setTimeout(
            ()=>{
              clearTimeout(initialTimeout);
              this.text = alert.text;

              //crazy here
              const initialInnerTimeout = setTimeout(
                ()=>{
                  clearTimeout(initialInnerTimeout);
                  this.type = alert.type;
                }, 
                0)
              
              const fadeoutInnerTimeout = setTimeout(
                  ()=>{
                    clearTimeout(fadeoutInnerTimeout);
                    this.type = this.initial;
                  }, 
                  this.delay-1000)
              //crazy here

              
            }, 
            1000)

        }, 
        0)

    }
  })
}

ngOnDestroy(): void {
  if(this.alertSub)this.alertSub.unsubscribe
}

}
