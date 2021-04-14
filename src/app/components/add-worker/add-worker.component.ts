import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SccSkillService } from '../../service/scc-skill.service';
import { Router } from '@angular/router'
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AngularFireStorage } from '@angular/fire/storage';
import { StoreInvoiceService } from 'src/app/service/store-invoice.service';
import { HomeComponent } from '../home/home.component';
import { AuthGuardService } from 'src/app/service/authguard.service';
@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.scss']
})
export class AddWorkerComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('container', {static: false}) container: ElementRef;
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
imgUrl;
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
serviceName: string =''; serviceDesc: string =''; serviceCost: number = 0; image: File; error: string = '';
  constructor(private storeUser : StoreInvoiceService,public dialog: MatDialog,private route : Router,private skillService : SccSkillService,private storage: AngularFireStorage, private authService: AuthGuardService, private render: Renderer2) { }
  displayedColumns: string[] = ['name', 'description', 'cost', 'actions'];

  openDialog(obj : any): void {
    // console.log(obj)
    this.storeUser.storeuser(obj);
    const dialogRef = this.dialog.open(HomeComponent, {
      width: '500px',
      data: {name: this.name1}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  delete(item) {
    this.skillService.delete1(item);
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
  addService() {
    const service: object = {
      averageRating: 0,
      cost: this.serviceCost,
      description: this.serviceDesc,
      name: this.serviceName,
      requestsMade: 0 
    }
    console.log(service);
    const result = this.authService.addService('servicesPlumbing', service, this.picture);
    (result['success']) ? (this.clearInputs()) : (this.error = result['message']);
  }
  clearInputs() {
    this.serviceCost = 0;
    this.serviceDesc = '';
    this.serviceName = '';
    this.picture = undefined;
    this.myUpload = undefined;
  }
  panelOpenState: boolean
  change(bln: boolean) {
    this.panelOpenState = bln;
    (bln) 
      ? this.render.setStyle(this.container.nativeElement, 'min-height', '398px')
      : this.render.removeStyle(this.container.nativeElement, 'min-height');
  }

  submit(){
    this.skillService.addWorker(this.worker);
    // this.route.navigateByUrl("/home");
  }
  viewDetails(id: string) {
    this.route.navigate(['/main-nav/reviews'], {queryParams: {collection: 'servicesPlumbing', id: id}})
  }
  ngOnInit() {
    this.skillService.viewServicePlumb()
    .subscribe((err) => {
      this.arrayService = err;
      console.log(this.arrayService)
      this.dataSourc = this.arrayService
      this.dataSourc.paginator = this.paginator;
      this.dataSourc.sort = this.sort;
    });
  }


}
