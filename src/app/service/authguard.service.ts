import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireFunctions } from '@angular/fire/functions'
import { Router } from '@angular/router';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  requestCollection: string = 'request'
  constructor(
    private route :Router,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
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
  checkingAuthStateBoolean() : Promise<boolean> {
    return new Promise ((resolve,reject)=>{
      return firebase.auth().onAuthStateChanged((user:firebase.User)=>{
        console.log(user);
        
        if (user) {
          resolve(true);
           } else{
            console.log('User is  not logged in');
            //this.router.navigate(['/sign-in']);
            resolve(false);
          }
          // Partner is everything okay?
      });
     
      });
  }
  getUser() {
    return new Promise( (resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged( user => {
        resolve (user)
      })
    })

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
      return new Promise( (resolve, reject) => {
        this.firestore.collection('user', ref => ref.where('email', '==', email)).valueChanges().subscribe( async res => {
          if(res.length > 0 && res[0]['admin'] === true) {
            await this.afAuth.auth.signInWithEmailAndPassword(email, password)
              .then((success) => resolve (success))
              .catch((err) => reject (err))
          } else {
            reject ({message: "Email is not recognised or badly formatted"})
          }
        })
      }) 
  }

  async signUp(user) {
    // this.functions.httpsCallable('')
    let { email, name, surname, number, username, password }  = user
    const results: object = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( res => { return res })
      .catch( err => { return err });

    console.log(results);
    let message: object = {}
    if(results['user']) {
      let uid: string = results['user']['uid']
      delete user.password; user.admin = true // removing password from user object and adding admin key
      message = await this.firestore.collection('user').doc(uid).set( user ).then( () => {
        console.log(results);
        const ret = {
          "code": "write success",
          "message": `A profile for ${name} ${surname} has been successfully added.`
        }
        return ret
      }).catch( (err) => {
        console.log(err);
        return { message: "There was an error saving user data" };
      })
    } else {
      message = results
      message['success'] = false;
    }
    return message
  }
  async addService(collection: string, service: object, image: any) {
    return new Promise( (resolve, reject) => {
      this.firestore.collection(collection).add(service).then( async(result: object) => {
        let serviceID: string = result['id']
        let storageRef = this.storage.ref('clothes/' + serviceID)
        storageRef.put(image).then((data : any) => {
          data.ref.getDownloadURL().then(url => {
            this.firestore.collection(collection).doc(serviceID).update({
              photoUrl: url,
              id: serviceID
            }).then( () => { resolve ({ success: true, message: 'Service has been successfully added.' }) })
              .catch( (err) => { reject ({ success: false, message: err.message }) })
          }).catch( (err) => { reject ({ success: false, message: err.message }) })
        }).catch( (err) => { reject ({ success: false, message: err.message }) })
      }).catch( (err) => { reject ({ success: false, message: err.message }) })
    })

  }
  updateUser(body, picture) {
    this.afAuth.auth.onAuthStateChanged( (user) => {
      let uid = user['uid']
      let storageRef = this.storage.ref('profile/' + uid)
      storageRef.put(picture).then( (data: any) => {
        data.ref.getDownloadURL().then(url => {
          body['photoUrl'] = url
          this.firestore.collection('user').doc(uid).update(body)
        })
      })

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
  declineRequest(requestID: string, userID: string) {
    let updateObject: object = {
      status: 'Declined',
      viewed: false
    }
    this.firestore.collection('request').doc(requestID).update(updateObject)
    this.firestore.collection('user').doc(userID).collection('request').doc(requestID).update(updateObject)
  }
  acceptRequest(requestID: string, userID: string) {
    let updateObject: object = {
      status: 'Accepted',
      viewed: false
    }
    this.firestore.collection('request').doc(requestID).update(updateObject)
    this.firestore.collection('user').doc(userID).collection('request').doc(requestID).update(updateObject)
  }
  postInvoice(requestID: string, pdfUriString: any, userID: string, serviceRequest: object) {
    this.storage.ref('/invoices/'+ requestID).put(pdfUriString).then( data => {
      data.ref.getDownloadURL().then(url => {
        let updateObject = {
          invoice: url,
          status: 'Processed',
          viewed: false
        }
        Object.assign(updateObject, serviceRequest)
        this.firestore.collection(this.requestCollection).doc(requestID).update(updateObject)
        this.firestore.collection('user').doc(userID).collection('request').doc(requestID).update(updateObject)
      }
      
      );
    }).catch(err => console.log(err));
  }
  closeRequest(requestID: string, userID: string) {
    let updateObject = { status: 'Closed'}
    this.firestore.collection(this.requestCollection).doc(requestID).update({status: 'Closed'})
    this.firestore.collection('user').doc(userID).collection('request').doc(requestID).update(updateObject)
  }

  fetchRequests() {
    return this.firestore.collection('request').valueChanges({ idField: 'id' })
  }
}
