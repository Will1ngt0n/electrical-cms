import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../service/authguard.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form
  submitted = false
  constructor(
    private fb: FormBuilder,
    private authService : AuthGuardService
    ) {
      this.form = fb.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        number: ['', [Validators.required]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      });
    }

  ngOnInit() {
  }
  valid(field) {
    if (!this.submitted) {
      return true
    }
    return this.form.get(field).valid
  }

  async submit() {
    console.log(this.form);
    
    if (this.form.valid) {
      if(this.form.value.password === this.form.value.confirmPassword){
        let user: object = {
          email: this.form.value.email,
          name: this.form.value.name,
          surname: this.form.value.surname,
          number: this.form.value.number,
          username: this.form.value.username,
          password: this.form.value.password,
          // confirmPassword: this.form.value.confirmPassword
        }
        console.log(user['email']);
        console.log(user['password']);
        let message = await this.authService.signUp(user);
        console.log(message);
        
        // console.log(user['email']);
        // console.log(user['password']);
      }
      else {
        let error = 'Passwords don\'t match'
        console.log(error);
        
      }
    }
  }
}
