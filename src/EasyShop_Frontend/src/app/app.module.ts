import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UserTableComponent } from './user-table/user-table.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TokenService } from './services/token.service';

import { RouterModule } from '@angular/router';
// Individual NgZorro modules
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { NzUploadModule } from 'ng-zorro-antd/upload';
import { HomePageComponent } from './home-page/home-page.component';


import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';


// import localeSrLatn from '@angular/common/locales/sr-Latn';
// registerLocaleData(localeSrLatn);
import localeDe from '@angular/common/locales/de';
import { CustomerComponent } from './customer/customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { ArticleTableComponent } from './article-table/article-table.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
registerLocaleData(localeDe);

import { EntryComponent } from './entries/entry/entry.component';
import { InvoiceReviewComponent } from './invoice-review/invoice-review.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    AppComponent,
  
    LoginFormComponent,
    NavigationComponent,
    UserTableComponent,
    EditUserComponent,
    UserDetailsComponent,
    HomePageComponent, 
    EntryComponent,
    CustomerComponent,
    EditCustomerComponent,
    CustomerTableComponent,
    ArticleTableComponent,
    EditArticleComponent,
    InvoiceComponent,
    InvoiceReviewComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    // Individual NgZorro modules
    NzTableModule,
    NzDividerModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzButtonModule,
    NzNotificationModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzUploadModule,
    CommonModule,
    NzPageHeaderModule,
    NzIconModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
    TokenService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
