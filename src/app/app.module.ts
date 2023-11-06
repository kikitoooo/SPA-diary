import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DiaryComponent } from './diary/diary.component';
import { HeaderComponent } from './header/header.component';
import { DiaryFormComponent } from './diary-form/diary-form.component';
import { LoginComponent } from './login/login.component';


// Создание путей маршрутизации
const routes: Routes = [
  { path: '', component: DiaryComponent},
  { path: 'data-entry', component: DiaryFormComponent},
  { path: 'edit/:id', component: DiaryFormComponent},
  { path: 'login', component: LoginComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    DiaryComponent,
    HeaderComponent,
    DiaryFormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
