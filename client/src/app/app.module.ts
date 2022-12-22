import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotePageComponent } from './note-page/note-page.component';
import { NoteComponent } from './shared/components/note/note.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule
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
