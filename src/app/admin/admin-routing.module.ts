import { AuthGuard }                from '../auth-guard.service';
import { AdminComponent } from './admin.component';
import { A } from './a';
import { B } from './b';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { Routes } from '@angular/router/src/config';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'admin/a', component: A },
          { path: 'admin/b', component: B },
          { path: '', component: AdminDashboardComponent }
        ],
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}