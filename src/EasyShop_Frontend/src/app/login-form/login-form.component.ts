import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { Role } from './../models/role.model';
import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { EditUserService } from '../services/edit-user.service';

/*
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  validateForm: FormGroup;
  user: User = new User();


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private notification: NzNotificationService,
    private sharedService: SharedService,
    private editUserService: EditUserService,

  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.validateForm.valid) {
      const user = {
        email: this.validateForm.value.email,
        password: this.validateForm.value.password,
      };

      this.loginService.login(this.user).subscribe({
        next: (response) => {
          if (response.indirektni) {
            localStorage.setItem('indirektni', response.indirektni);
            this.sharedService.setIndirektni(response.indirektni);
          } else {
            this.sharedService.setIndirektni(null);
          }

          if (response.access_token) {
            localStorage.setItem('token', response.access_token);
          }

          if (response.role) {
            localStorage.setItem('role', response.role);
          }

          this.router.navigate(['/']).then(() => {
            this.notification.create('success', 'Uspesno ste se prijavili! ', '');
          });
        },
        error: (err) => {
          this.notification.create('error', 'Neispravno korisnicko ime ili lozinka!', '');
        }
      });
    } else {
      this.validateForm.markAllAsTouched();
    }
  }
}*/
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  user: User = new User();

  validateForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true],
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private editUserService: EditUserService,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {}

  submitForm(): void {
    if (this.validateForm.valid) {
      this.user.email = this.validateForm.value.email;
      this.user.password = this.validateForm.value.password;
      console.log('User in submitForm', this.user);

      this.loginService.login(this.user).subscribe({
        next: (response) => {
          console.log('Response from login:', response);
          
          if (response.access_token) {
            localStorage.setItem('token', response.access_token);
          }

          if (response.role) {
            localStorage.setItem('role', response.role);
          }

          // Ensure all local storage items are set before navigating
          this.router.navigate(['/']).then(() => {
            console.log('Navigation completed');
          });
        },
        error: (err) => {
          this.notification.create(
            'error',
            'Neispravno korisnicko ime ili lozinka',
            ''
          );
        },
        complete: () => {
          console.log('Observable completed');
        },
      });
      this.close();
      this.editUserService.setUser(new User());
    } else {
      console.log('Forms are invalid from submitForm');

      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // submitForm(): void {
  //   if (this.validateForm.valid) {
  //     this.user.email = this.validateForm.value.email;
  //     this.user.password = this.validateForm.value.password;
  //     console.log('User in submitForm', this.user);
  //
  //     this.loginService.login(this.user).subscribe({
  //       next: (response) => {
  //         console.log('Inside next from subscribe of submitForm');
  //         localStorage.setItem('token', response.access_token);
  //         localStorage.setItem('role', response.role);
  //         localStorage.setItem('indirektni', response.indirektni);
  //
  //         this.router.navigate(['/']);
  //       },
  //       error: (err) => {
  //         this.notification.create(
  //           'error',
  //           'Neispravno korisnicko ime ili lozinka',
  //           ''
  //         );
  //         //alert(err.message);
  //       },
  //       complete: () => {
  //         console.log('Observable completed');
  //       },
  //     });
  //     this.close();
  //     this.editUserService.setUser(new User());
  //   } else {
  //     console.log('Forms are invalid from submitForm');
  //
  //     Object.values(this.validateForm.controls).forEach((control) => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  // }

  close(): void {
    console.log('This is close');
  }
}
