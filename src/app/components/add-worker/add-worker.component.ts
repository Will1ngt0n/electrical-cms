import { Component, OnInit, ViewChild } from '@angular/core';
import { SccSkillService } from '../../service/scc-skill.service';
import { Router } from '@angular/router'
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { StoreInvoiceService } from 'src/app/service/store-invoice.service';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.scss']
})
export class AddWorkerComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
item;
worker = {
  name : "",
  surname : "",
  gender : "",
  workerid : "",
  specialty : "",
  phoneNo : 0,
  bio :  ""
}
uploadPercent;
mainImage;
imgURL;
downloadU;
storag;

temp;
arrayService;
dataSourc;
service = {
  name : "",
  description :"",
  cost : 0,
  photoURL : ""

}
name1="plumbing";
animal;
name="";
desc="";
cost="";
  constructor(private storeUser : StoreInvoiceService,public dialog: MatDialog,private route : Router,private skillService : SccSkillService,private storage: AngularFireStorage) { }
  displayedColumns: string[] = ['name', 'description', 'cost', 'actions'];
  try(){
    console.log(this.worker);
    console.log(this.temp);
  }

  openDialog(obj : any): void {
    // console.log(obj)
    this.storeUser.storeuser(obj);
    const dialogRef = this.dialog.open(HomeComponent, {
      width: '250px',
      data: {name: this.name1}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  delete(a) {
    this.skillService.delete1(a);
    console.log(a.name + " deleted!")
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

  test(){
    if(this.service.name && this.service.description && this.service.cost) {
    console.log( this.service);
    // this.skillService.addPlumService(this.service);
    }
  }
  push(){
    this.route.navigateByUrl('addService')
  }

  submit(){
    this.skillService.addWorker(this.worker);
    // this.route.navigateByUrl("/home");
  }
  viewDetails(id) {
    this.route.navigate(['/main-nav/reviews'], {queryParams: {collection: 'servicesPlumbing', id: id}})
  }
  ngOnInit() {
    this.skillService.viewServicePlumb()
    .subscribe((err) => {
      this.arrayService = err;
      console.log(this.arrayService)
      // console.log(this.arrayService)
      this.dataSourc = this.arrayService
      this.dataSourc.paginator = this.paginator;
      this.dataSourc.sort = this.sort;
    });
  }


}
