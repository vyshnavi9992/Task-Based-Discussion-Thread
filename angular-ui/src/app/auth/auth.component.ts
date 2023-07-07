import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      'password':  new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(20)])
    });
  }

  ngOnInit() {
    
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', [Validators.minLength(5),Validators.required]));
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    
    const credentials =  {
      "id": ' ',
      "name": this.authForm.value.username != undefined ? this.authForm.value.username: null,
      "email":this.authForm.value.email,
      "password":this.authForm.value.password,
      "phoneno":"245178"
    }

    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => {
        if(this.authType == 'register'){
          this.router.navigateByUrl('/login');
        } else {
          this.router.navigateByUrl('/');
        }
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
