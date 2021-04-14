import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import { StoreInvoiceService } from './store-invoice.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})


export class SccSkillService {
  writePost;
  key : string = "";
  private itemDoc: AngularFirestoreDocument<request>; // class name

  constructor (private dog : AngularFirestore, private store : StoreInvoiceService) {
    
  }

  // getData(){
  //   return this.dog.collection('Grocery').valueChanges();
  // }

  addWorker(worker) {

    this.writePost = this.dog.collection<any>('workers');
    this.writePost.add(worker).then(() =>{

      console.log("worker added successful");
    });
}

delete(obj :any){
console.log(obj);
    return this.dog.collection('services/').doc(obj.id).delete().then(() =>{

      // alert('service '+ obj.name+' successful deleted');
    }
    );

}
delete1(obj :any){
  console.log(obj);
      return this.dog.collection('servicesPlumbing/').doc(obj.id).delete().then(() =>{
  
        // alert('service '+ obj.name+' successful deleted');
      }
      );
  
  }
  delete2(obj :any){
    console.log(obj);
        return this.dog.collection('serviceICT/').doc(obj.id).delete().then(() =>{
    
          // alert('service '+ obj.name+' successful deleted');
        }
        );
    
    }
updateUserObj(item,key){
  console.log(item)
  // this.key = this.store.getKey();
  // single field of request this.itemDoc = 
  console.log(key)
this.dog.collection('user/').doc(item.id).collection('request').doc(key).update({
  photoURL : item
})
// .subscribe((ee) => {
//   console.log(ee)
// })
  // this.dog.collection('user/').doc(item.id).collection('request').doc(id).snapshotChanges()
  // .subscribe((ee) => {
  //   console.log(ee);
  // }
  // );
  // this.itemDoc.update(item).then(() =>{
  //   alert(item.name +' is updated successful')
  // });
  console.log("service updated succesful");
}

updateService(item){
  console.log(item.id)
  this.itemDoc = this.dog.collection('services/').doc(item.id);
  this.itemDoc.update(item).then(() =>{
    alert(item.name +' is updated successful')
  });
  console.log("service updated succesful");
}

updateService1(item){
  console.log(item)
  this.itemDoc = this.dog.collection('serviceICT/').doc(item.id);
  this.itemDoc.update(item).then(() =>{
    alert(item.name +' is updated successful')
  });
  console.log("service updated succesful");
}
updateService2(item){
  console.log(item.id)
  this.itemDoc = this.dog.collection('servicesPlumbing/').doc(item.id);
  this.itemDoc.update(item).then(() =>{
    alert(item.name +' is updated successful')
  });
  console.log("service updated succesful");
}

viewServiceElectrical(){
  return this.dog.collection<any>('services').snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
}
viewServiceICT(){
  return this.dog.collection<any>('serviceICT').snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
}

viewServicePlumb(){
  return this.dog.collection<any>('servicesPlumbing').snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
}
viewDetailRequest(id){
  return this.dog.collection<any>('request').doc(id).valueChanges();
}

viewRequest(){
  return this.dog.collection<any>('request', ref => ref.orderBy('stamp','desc')).snapshotChanges();
  // .pipe(
  //   map(actions => actions.map(a => {
  //     const data = a.payload.doc.data() as any;
  //     const id = a.payload.doc.id;
  //     return { id, ...data };
  //   }))
  // );
}

addElecService(worker) {

  this.writePost = this.dog.collection<any>('services');
  this.writePost.add(worker).then(() =>{

    console.log("service added successful");
  });
}

addIctService(worker) {

  this.writePost = this.dog.collection<any>('serviceICT');
  this.writePost.add(worker).then(() =>{

    console.log("service added successful");
  });
}

addPlumService(worker) {

  this.writePost = this.dog.collection<any>('servicesPlumbing');
  this.writePost.add(worker).then(() =>{

    console.log("service added successful");
  });
}

}