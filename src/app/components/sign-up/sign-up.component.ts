import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../service/authguard.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form
  submitted = false
  error: string =''

  constructor( private fb: FormBuilder, private authService : AuthGuardService, private router: Router ) {
    this.form = this.fb.group({
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
  login() {
    this.router.navigate(['login'])
  }

  async submit() {
    if(this.form.valid) {
      if(this.form.value.password === this.form.value.confirmPassword) {
        let user: object = this.form.value
        delete user['confirmPassword'];
        let message = await this.authService.signUp(user);
        (!message['success']) ? ( this.error = message['message'] ) : ( this.router.navigate(['main-nav/listService']) );
      } else {
        this.error = 'Passwords don\'t match';
      }
    }
  }
}
