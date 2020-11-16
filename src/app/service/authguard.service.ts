import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private route :Router,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private functions: AngularFireFunctions
    ) {

      // var user = firebase.auth().currentUser;
    // afAuth.auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.route.navigateByUrl('main-nav')
    //   } else {
    //     this.route.navigateByUrl('login')
    //   }
    // });

  }

  async sign_Out() {
    await this.afAuth.auth.signOut();
    this.route.navigateByUrl('/login');
    // this.router.navigate(['/']);
  }

  check_Authentication() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.route.navigateByUrl('main-nav')
      } else {
        this.route.navigateByUrl('login')
      }
    });
  }
  checkUser() {
    return this.afAuth.auth.onAuthStateChanged( (user) => {
      console.log(user['uid']);
        return this.firestore.collection('user').doc(user['uid']).valueChanges().subscribe( (res) => {
        console.log(res)
        // return res
      })
    })
  }

  async signIn(email: string, password: string) {
    try {
      console.log('authguard');
      
      await this.firestore.collection('user', ref => ref.where('email', '==', email)).valueChanges().subscribe( async res => {
        console.log(email);
        console.log(res);
        // console.log();
        if(res[0]['admin'] === true){
          console.log(0);
          await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((success) => {
            alert(email + 'successful signed in ..')
            this.route.navigateByUrl('main-nav')
          }).catch((err) => {
            alert(err)
          })
        }
      })
    } catch (error) {
      console.warn(error);
      alert(error)
    }

    // await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((success) => {
    //   alert(email + 'successful signed in ..')
    //   this.route.navigateByUrl('main-nav')
    // }).catch((err) => {
    //   alert(err)
    // })

    // await this.functions.httpsCallable('signInAdmin')( {email: email, password: password} ).subscribe( res => {
    //   console.log(res);
      
    // })
  }
  // async signUp(user) {
  //   // this.functions.httpsCallable('')
  //   let { email, name, surname, number, username, password}  = user
  //   await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then( (results: object) => {
  //     let uid: string = results['user']['uid']
  //     if(uid) {
  //       this.firestore.collection('user').doc(uid).set({
  //         admin: true,
  //         email: email,
  //         name: name,
  //         surname: surname,
  //         number: number,
  //         username: username
  //       }).then( () => {
  //         console.log(results);
  //       }).catch( (err) => {
  //         console.log(err);
          
  //       })
  //     }
  //     // let call = this.functions.httpsCallable('makeAdmin')
  //     // call( {email: email} ).subscribe(res => {
  //     //   console.log(res);
  //     // })

  //   }).catch( (err) => {
  //     console.log(err);
  //     let msg: string = err['message']
  //     return err
  //   })
  // }

  async signUp(user) {
    // this.functions.httpsCallable('')
    let { email, name, surname, number, username, password}  = user
    let results: object = await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then( res => {
      return res
    }).catch( err => {
      return err
    })
    console.log(results);
    let message: object = {}
    if(results['user']) {
      let uid: string = results['user']['uid']
      delete user.password; user.admin = true // removing password from user object and adding admin key
      message = await this.firestore.collection('user').doc(uid).set( user ).then( () => {
        console.log(results);
        let ret = {
          "code": "write success",
          "message": `A profile for ${name} ${surname} has been successfully added.`
        }
        return ret
      }).catch( (err) => {
        console.log(err);
        return err
      })
    } else {
      message = results
    }
    return message
      // let call = this.functions.httpsCallable('makeAdmin')
      // call( {email: email} ).subscribe(res => {
      //   console.log(res);
      // })

  }
  updateUser(body) {
    this.afAuth.auth.onAuthStateChanged( (user) => {
      let uid = user['uid']
      this.firestore.collection('user').doc(uid).update(body)
    })
  }

  signOut() {
    this.afAuth.auth.signOut().then((success) => {
     this.route.navigateByUrl('login').then(()=>{
       console.log("success" + success);
       this.route.navigateByUrl('/login');
     })



   }).catch((error) => {
     console.log(error)
   })
 }
}
