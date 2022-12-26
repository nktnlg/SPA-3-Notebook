import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomePageComponent } from './main-layout/home-page/home-page.component';
import { NotePageComponent } from './main-layout/note-page/note-page.component';
import { NoteComponent } from './main-layout/home-page/note/note.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    NotePageComponent,
    NoteComponent,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor}],
  bootstrap: [AppComponent]
})
export class AppModule { }
