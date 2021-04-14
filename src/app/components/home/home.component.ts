import { Component, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { DialogData } from '../add-service/add-service.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import { StoreInvoiceService } from '../../service/store-invoice.service';
import { Router } from '@angular/router';
import { SccSkillService } from 'src/app/service/scc-skill.service';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {

  uploadPercent;
  mainImage;
  imgURL;
  downloadU;
flag:string;
  name ;
  description;
  cost;
  photoURL;

  service = {
    name : "",
    description :"",
    cost : 0,
    photoURL : ""
  
  }
  User = {
    id : '',
    cost : 0,
    description : '',
    name : '',
    photoURL : ''
  }



  constructor(private storeUser : StoreInvoiceService,public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private storage: AngularFireStorage,private route : Router,private skill: SccSkillService) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  uploadFile(files) {
    if (files.length === 0)
    return;

  var mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    // this.message = "Only images are supported.";
    return;
  }

  const file = files[0];
  console.log(file)
  const fileName = files[0].name;
  var reader = new FileReader();
  // this.imagePath = files;
  reader.readAsDataURL(files[0]);
  console.log(reader)
  reader.onload = (_event) => {
    this.imgURL = reader.result;
    console.log(this.imgURL)
    console.log(reader.result)
  }
  console.log(this.imgURL)
    // const file = event.target.files[0];
    const filePath = 'pics/PIC' + Math.random().toString(36).substring(2);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadU = fileRef.getDownloadURL().subscribe(url => {
          console.log(url);
          this.service.photoURL = url;
          this.mainImage = url
          this.uploadPercent = null;
        });
      })
    ).subscribe();
  }

  test() {
    if(this.name != "") {
      if(this.description != "") {
        if(this.cost != 0 || this.cost !=  null)  {
        
          this.User.id  = this.storeUser.getUser().id;
           this.User.name = this.name ;
          this.User.description = this.description ;
          this.User.cost = this.cost ;
           this.User.photoURL = this.photoURL ;
//            this.skill.updateService(this.User);
// this.dialogRef.close();
if(this.flag == 'electrical') {
  console.log( '***electrical***')
  this.skill.updateService(this.User); 
}
if(this.flag == 'plumbing') {
  console.log( '***plumbing***')
  this.skill.updateService2(this.User);
}
if(this.flag == 'ict') {
  console.log( '***ict***')
  this.skill.updateService1(this.User);
}
this.dialogRef.close();


          } else {
            
          alert("Service cost required")
            console.log("User object cannot be empty")
          }
        }
        else {
          alert("Service description required")
          console.log("User object cannot be empty")
        }
        } else {
          alert("Service name required")
          console.log("User object cannot be empty")
        }
      }
    
  
test1(){
  
  this.User.id  = this.storeUser.getUser().id;
  this.User.name = this.name ;
  this.User.description = this.description ;
  this.User.cost = this.cost ;
   this.User.photoURL = this.photoURL ;
   
console.log(this.User)
if(this.flag == '***electrical***') {
  console.log( 'electrical')
  // this.skill.updateService(this.User);
}
if(this.flag == 'plumbing') {
  console.log( '***plumbing***')
  this.skill.updateService2(this.User);
}
if(this.flag == 'ict') {
  console.log( '***ict***')
  this.skill.updateService1(this.User);
}
this.dialogRef.close();

}
update() {
  
}
  ngOnInit() {
    this.name = this.storeUser.getUser().name;
    this.description = this.storeUser.getUser().description;
    this.cost = this.storeUser.getUser().cost;
    this.photoURL = this.storeUser.getUser().photoURL;
    this.flag = this.data.name
    // console.log(this.flag);
    
  }

}
