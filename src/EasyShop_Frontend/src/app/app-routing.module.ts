import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { AuthGuard } from './auth.guard';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { EntryComponent } from './entries/entry/entry.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { ArticleTableComponent } from './article-table/article-table.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceReviewComponent } from './invoice-review/invoice-review.component';

//dddddddddddddddddd

const routes: Routes = [

  { path: '', component: HomePageComponent,
  canActivate: [AuthGuard] },
  { path: 'invoice', component: InvoiceComponent,
  canActivate: [AuthGuard] },

  { path: 'entry', component: EntryComponent,
   canActivate: [AuthGuard] },
   { path: 'article', component: ArticleTableComponent,
   canActivate: [AuthGuard] },

  { path: 'login', component: LoginFormComponent },
  { path: 'users', component: UserTableComponent, canActivate: [AuthGuard] },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },

  { path: 'blank', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'pregled', component: EntryComponent,
     canActivate: [AuthGuard]
 },

  {
    path: 'customer',
    component: CustomerTableComponent,
     canActivate: [AuthGuard],
  },
  {
    path: 'invoice-review',
    component: InvoiceReviewComponent,
     canActivate: [AuthGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
