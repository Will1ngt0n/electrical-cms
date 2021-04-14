import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../service/authguard.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  form: FormGroup;
  submitted: boolean = false
  error = '';

  constructor(private fb: FormBuilder,
    private authService : AuthGuardService,
    private route :Router,) {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]]
      });
  }

  login() {
    this.route.navigateByUrl('request-details');
  }
  signup() {
    this.route.navigate(['sign-up'])
  }
  valid(field) {
    if (!this.submitted) {
      return true
    }
    return this.form.get(field).valid
  }
  changed() {
    console.log(this.form);
    
  }
  submit(){
    // this.submitted = true;
    this.error = '';
    if (this.form.valid) {
      let { email, password } = this.form.value;  console.log(email);  console.log(password);
      this.authService.signIn(email,password).then( (data) => {
        console.log(data);
      }).catch( err => {
        this.error = err.message;
      });
    }
  }
  ngOnInit() {
    this.authService.check_Authentication();

    // this.form.patchValue( {
    //   email: 'willington.mnisi@gmail.com',
    //   password: 'dangerous'
    // }) 
  }
}