import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthGuardService } from 'src/app/service/authguard.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form
  constructor(private fb: FormBuilder, private auth : AuthGuardService, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]]
    });
  }

  logout() {
    this.auth.signOut();
  }
  updateAdmin() {
    let user = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      number: this.form.value.number,
      email: this.form.value.email
    }
    this.auth.updateUser(user)
  }

  // checkUser() {
  //   return this.auth.checkUser().then( async (res) => {
  //     console.log('we are in profile ' + res);
      
  //   })
  // }
  checkUser() {
    return this.afAuth.auth.onAuthStateChanged( (user) => {
      console.log(user['uid']);
        return this.firestore.collection('user').doc(user['uid']).valueChanges().subscribe( (res) => {
        console.log(res)
        // return res
        this.form.patchValue({
          name: res['name'],
          surname: res['surname'],
          number: res['number'],
          email: res['email']
        })
      })
    })
  }
  ngOnInit() {
    this.checkUser()
  }

}
