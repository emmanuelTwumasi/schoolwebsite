import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    // App component will be declared here once we update it
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [] // Bootstrap component will be set here
})
export class AppModule { }
