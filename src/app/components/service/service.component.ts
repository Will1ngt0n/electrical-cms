import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SccSkillService } from 'src/app/service/scc-skill.service';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';

import { StoreInvoiceService } from '../../service/store-invoice.service';
import { AuthGuardService } from 'src/app/service/authguard.service';
import { Router } from '@angular/router';
export interface Food {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  host:{'style':'width:100%'}
})
export class ServiceComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('container', {static: true}) container: ElementRef;
  imgURL ;
  arrayService;
  arrayICTService;
  array;
  dataSource: Food[] = [
    { name: 'Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
    { name: 'Sandwich', calories: 237, fat: 9, carbs: 37, protein: 4 },
    { name: 'Eclairs', calories: 262, fat: 16, carbs: 24, protein: 6 },
    { name: 'Cupcakes', calories: 305, fat: 4, carbs: 67, protein: 4 },
    { name: 'Gingerbreads', calories: 356, fat: 16, carbs: 49, protein: 4 },
  ];
  // displayedColumns: string[] = ['name', 'calories', 'fat', 'carbs','protein'];
  displayedColumns: string[] = ['name', 'description', 'cost', 'actions'];
  uploadPercent : any;
  storag: any;
  mainImage: any;
  downloadU: any;
  error : string = '';
  constructor(private route: Router, private storeUser : StoreInvoiceService,public dialog: MatDialog,private skill: SccSkillService, private storage: AngularFireStorage, private authService: AuthGuardService, private render: Renderer2) { }
  dataSourc: any;
  message;
  imgUrl;
  obj :   any;
  imgPath;
  name= 'electrical';
  animal ="JACK";
  service = {
    name: '',
    description: '',
    cost: 0,
    image: ''
  };
  serviceName: string =''; serviceDesc: string =''; serviceCost: number = 0; image: File
  openDialog(obj : any): void {
    console.log(obj)
    this.storeUser.storeuser(obj);
    const dialogRef = this.dialog.open(HomeComponent, {
      width: '500px',
      // height: '600px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  
  

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
  panelOpenState: boolean
  change(bln) {
    this.panelOpenState = bln;
    (bln) 
      ? this.render.setStyle(this.container.nativeElement, 'min-height', '398px')
      : this.render.removeStyle(this.container.nativeElement, 'min-height');
  }
  uploadProfilePic(files) {
    console.log(files);

    //   if(event.length === 0){
    //     return;
    //   }
    //   var mimeType = event[0].type;
    //  if(mimeType.match(/image\/*/) == null){
    //   this.message =" Only images are supported."
    //  }
    //  const files = event[0];
    //   console.log(files)
    // //  const id = Math.random().toString(36).substring(2);
    // var reader = new FileReader();
    // this.imgPath= event;
    // reader.readAsDataURL(event[0]);
    // reader.onload = (_event) => {
    //   this.imgUrl =reader.result;
    // }
    //  const fileName = event[0].name;
    //  const file = event.target.files[0];
    //  const filePath = `uploads/profile_${id}`;
    //  console.log(id)
    //  console.log(file)
    //  console.log(filePath)
  }
  // run(){;
  //   this.skill.viewService().subscribe((err) =>{
  //     console.log(err)
  //   })
  // }
  update(a) {
    console.log(a.name + " updated!");
    this.skill.updateService(a);
  }
  delete(item) {
    this.skill.delete(item);
  }
  ngOnInit() {

    // this.afs.collection('user/').snapshotChanges().subscribe((data: any) => {
    //   this.array = data.map(e => {
    //     return {
    //       key: e.payload.doc.id,
    //       ...e.payload.doc.data()
    //     };
    //   });
    // })
  
    this.skill.viewServiceElectrical().subscribe((err) => {
      this.arrayService = err;
      console.log(this.arrayService)
      console.log(this.arrayService)
      this.dataSourc = new MatTableDataSource(this.arrayService)
      this.dataSourc.paginator = this.paginator;
      this.dataSourc.sort = this.sort;
    });





  }
  viewDetails(id: string) {
    this.route.navigate(['/main-nav/reviews'], {queryParams: {collection: 'services', id: id}})
  }
  async addService() {
    const service: object = {
      averageRating: 0,
      cost: this.serviceCost,
      description: this.serviceDesc,
      name: this.serviceName,
      requestsMade: 0 
    }
    console.log(service);
    const result = await this.authService.addService('services', service, this.picture);
    (result['success']) ? (this.clearInputs()) : (this.error = result['message']);
  }
  clearInputs() {
    this.serviceCost = 0;
    this.serviceDesc = '';
    this.serviceName = '';
    this.picture = undefined;
    this.myUpload = undefined;
  }

}
