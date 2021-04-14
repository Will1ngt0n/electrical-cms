import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthGuardService } from 'src/app/service/authguard.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form
  profileImg
  constructor(private fb: FormBuilder, private auth : AuthGuardService, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
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
      email: this.form.value.email,

    }
    this.auth.updateUser(user, this.picture)
  }

  uploadFile(event: object) {
    
  }
  picture
  myUpload
  addPicture(event){
    this.picture = <File>event.target.files[0]
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.myUpload = event.target.result;
          console.log(this.myUpload);
          
        };
        reader.readAsDataURL(event.target.files[0]);
        // if(event.target.files[0]){
        //   this.uploaderImage[0].style.display = "none"
        //   this.uploadedImage[0].style.display = "block"
        // }
        // this.checkValidity()
  }
  checkUser() {
    return this.afAuth.auth.onAuthStateChanged( (user) => {
      console.log(user['uid']);
        return this.firestore.collection('user').doc(user['uid']).valueChanges().subscribe( (res) => {
        console.log(res)
        this.profileImg = res['photoUrl']
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
