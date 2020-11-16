import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthGuardService } from '../../service/authguard.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  mail;
  pass;

  form: FormGroup;
  submitted = false
  error = '';


  constructor(private fb: FormBuilder,
    private authService : AuthGuardService,
    private route :Router,) {
      this.form = fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
  }

  login() {
    this.route.navigateByUrl('request-details');
  }
  valid(field) {
    if (!this.submitted) {
      return true
    }
    return this.form.get(field).valid
  }

  submit(){
    // this.submitted = true;
    this.error = '';
   
    if (this.form.valid) {
      
    //   this.loginService.login(this.form.value['email'], this.form.value['password']).then(() => {
    //     console.log('Success');
    //   }).catch(err => {
    //     console.log(err);
    //     this.error = err.message;
    //   })
    let mail =this.form.value.email;
    let password = this.form.value.password;
   
      this.authService.signIn(mail,password);
      console.log(mail);
      console.log(password);
    }
      }
  ngOnInit() {
    this.authService.check_Authentication();

    this.form.patchValue( {
      email: 'willington.mnisi@gmail.com',
      password: 'dangerous'
    }) 
  }
  }
