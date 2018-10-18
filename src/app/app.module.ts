import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rootReducer } from './../redux/app.reducer';

import {
  LocationStrategy,
  HashLocationStrategy,
} from '@angular/common';

import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { DeveloperComponent } from './developer/developer.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddDeveloperComponent } from './add-developer/add-developer.component';

const routes: Routes = [
  // basic routes

];

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    DeveloperComponent,
    AddProjectComponent,
    AddDeveloperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
