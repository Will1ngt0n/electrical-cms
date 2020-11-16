import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthGuardService } from '../service/authguard.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnDestroy{
  mobileQuery: MediaQueryList;
  sideBarOpen = true;
  username: string = '.........'
  email: string = '.........'
  adminPages = [
    { name: 'Home', page: 'home' , icon:'assignment'},
    //{ name: 'Add New Course', page: 'addNewCourse' },
    { name: 'Courses', page: 'courses' },
    { name: 'Add Course Content', page: 'addCourseContent' },
    { name: 'Add User', page: 'addUser' },
    { name: 'Applications', page: 'applications' },
    { name: 'Registered Students', page: 'posts'}
  ]
  pagesToDisplay = [];
constructor(private route : Router,private auth : AuthGuardService, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {

}

logout() {
  this.auth.signOut();
}

open(){
  // sidenav.toggle
  this.sideBarOpen = true;
}
push(){
  this.route.navigateByUrl('main-nav/listService');
}

profile() {
  this.route.navigateByUrl('main-nav/profile');
}
ngOnInit() {
  this.checkUser()
}
checkUser() {
  return this.afAuth.auth.onAuthStateChanged( (user) => {
    console.log(user['uid']);
      return this.firestore.collection('user').doc(user['uid']).valueChanges().subscribe( (res) => {
      console.log(res)
        this.username = res['name']
        this.email = res['email']
    })
  })
}
ngOnDestroy(): void {

}
}
