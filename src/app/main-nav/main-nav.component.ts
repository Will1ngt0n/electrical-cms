import { Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
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
  sideBarOpen = false;
  username: string = '.........'
  email: string = '.........'
  close
  pagesToDisplay = [];
  mode: string = 'side'
  @ViewChild('container', {static: false}) container: ElementRef
constructor(private route : Router,private auth : AuthGuardService, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private render: Renderer2) {
  console.log('Constructor');
  
  this.mode = 'side'
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
    console.log('NG Oninit');
    
    this.checkUser()
    setTimeout( () => {
      this.checkScreenWidth()
    }, 10)

  }
  photoUrl
  checkUser() {
    return this.afAuth.auth.onAuthStateChanged( (user) => {
      console.log(user['uid']);
        return this.firestore.collection('user').doc(user['uid']).valueChanges().subscribe( (res) => {
        console.log(res)
          this.username = res['name']
          this.email = res['email']
          this.photoUrl = res['photoUrl']
      })
    })
  }
  ngOnDestroy(): void {

  }
  checkScreenWidth() {
    // setTimeout( () => {
      console.log(this.container.nativeElement);
      // this.render.listen(this.container.nativeElement, 'scroll', (ev) => this.changeMode(ev))
      this.render.listen(this.container.nativeElement, 'onafterprint', (ev) => { console.log(ev); })
      console.log(window);
      console.log(document);
      
      this.render.listen('document', 'load', (ev) => { console.log(ev);
        
      })
      this.render.listen(this.container.nativeElement, 'resize', (ev) => { console.log(ev);})
    // }, 1200)

    
  }
  changeMode(ev) {
    console.log(ev);
    
  }
  toggleMode() {
    console.log(this.container.nativeElement.clientWidth);
    let width = this.container.nativeElement.clientWidth
    if(width > 1024) {
      this.mode = 'side'
    } else {
      this.mode = 'over'
    }
  }
}
