import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth.guard';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { EntryComponent } from './entries/entry/entry.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { ArticleTableComponent } from './article-table/article-table.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceReviewComponent } from './invoice-review/invoice-review.component';
import { ContractComponent } from './contract/contract.component';
import { NewContractComponent } from './new-contract/new-contract.component';
import { ContractPrintComponent } from './contract-print/contract-print.component';
import { InstalmentCustomerComponent } from './instalment-customer/instalment-customer.component';
import { UnpaidedInstalmentsComponent } from './unpaided-instalments/unpaided-instalments.component';
import { AllInstalmentsComponent } from './all-instalments/all-instalments.component';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';


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
  {
    path: 'contract',
    component: ContractComponent,
     canActivate: [AuthGuard],
  },
    {
      path: 'new-contract',
      component: NewContractComponent,
       canActivate: [AuthGuard],
    },
    {
      path: 'contract-print',
      component: ContractPrintComponent,
       canActivate: [AuthGuard],
    },
    {
      path: 'instalment-customer',
      component: InstalmentCustomerComponent,
       canActivate: [AuthGuard],
    },
    {
      path: 'unpaid-instalments',
      component: UnpaidedInstalmentsComponent,
       canActivate: [AuthGuard],
    },
    {
      path: 'all-instalments',
      component: AllInstalmentsComponent,
       canActivate: [AuthGuard],
    },
    {
      path: 'payment-confirmation',
      component: PaymentConfirmationComponent,
       canActivate: [AuthGuard],
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
