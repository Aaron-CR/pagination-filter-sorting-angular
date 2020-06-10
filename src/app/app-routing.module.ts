import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', loadChildren: () => import('./views/index/index.module').then(m => m.IndexModule) },
  { path: 'articles', loadChildren: () => import('./views/articles/articles.module').then(m => m.ArticlesModule) },
  { path: 'customers', loadChildren: () => import('./views/customers/customers.module').then(m => m.CustomersModule) },
  { path: 'employees', loadChildren: () => import('./views/employees/employees.module').then(m => m.EmployeesModule) },
  { path: 'invoices', loadChildren: () => import('./views/invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'not-found', loadChildren: () => import('./views/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
