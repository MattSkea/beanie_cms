import { DataService } from './data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BeanieComponent } from './beanie/beanie.component';
import { Routes, RouterModule } from '@angular/router';
import { BeanieListComponent } from './beanie-list/beanie-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { B } from './admin/b';
import { A } from './admin/a';
import { LoginComponent } from './login/login.component';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; //helps material design support animations in all browseres
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatListModule, MatProgressBarModule,} from '@angular/material'; //imports ngModule for each material design component

const appRoutes: Routes = [
  { path: 'beanies', component: BeanieListComponent, pathMatch: 'full' },
  {
    path: 'beanie/:_id', component: BeanieComponent, pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'beanie', component: BeanieComponent, pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin', component: AdminComponent, pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  { path: 'admin/a', component: A , pathMatch: 'full'},
  { path: 'admin/b', component: B , pathMatch: 'full'},
  { path: 'login', component: LoginComponent , pathMatch: 'full'},

  {
    path: '',
    redirectTo: '/beanies', // Where to go when no route is specified
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BeanieComponent,
    BeanieListComponent,
    PageNotFoundComponent,
    AdminComponent,
    A,
    B,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule,
    MatProgressBarModule,
    
  ],
  providers: [DataService,
    AuthService,
    AuthGuard,
    CanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
