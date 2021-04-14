import { Component, OnInit,Inject, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SccSkillService } from '../../service/scc-skill.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { StoreInvoiceService } from 'src/app/service/store-invoice.service';
import { AuthGuardService } from 'src/app/service/authguard.service';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})

export class AddServiceComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('container', { static: false }) container: ElementRef;
  service = {
    name : "",
    description :"",
    cost : 0
  }
  error: string = ''
  displayedColumns: string[] = ['name', 'description', 'cost', 'actions'];
  arrayService;
  dataSourc;
  name="ict";
  imgUrl
  animal;
  serviceName: string =''; serviceDesc: string =''; serviceCost: number = 0; image: File
@Input() temp:any;

  constructor(private route: Router, private storeUser : StoreInvoiceService,public dialog: MatDialog, private nav : ActivatedRoute,private skillService : SccSkillService, private authService: AuthGuardService, private render: Renderer2) {}

  openDialog(obj : any): void {
    console.log(obj)
    this.storeUser.storeuser(obj);
    this.dialog.open(HomeComponent, {
      width: '500px',
      data: {name: this.name}
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


  async addService() {
    const service: object = {
      averageRating: 0,
      cost: this.serviceCost,
      description: this.serviceDesc,
      name: this.serviceName,
      requestsMade: 0 
    }
    console.log(service);

    let result = await this.authService.addService('servicesICT', service, this.picture);
    (result['success']) ? (this.clearInputs()) : (this.error = result['message']);
    // this.clearInputs();
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

  viewDetails(id: string) {
    this.route.navigate(['/main-nav/reviews'], {queryParams: {collection: 'servicesICT', id: id}})
  }
  delete(item) {
    this.skillService.delete2(item);
  }
  ngOnInit() {
    this.nav.queryParams.subscribe(data => {
      console.log(data)
      this.temp = data
      console.log(JSON.stringify(this.temp))
  });

  this.skillService.viewServiceICT()
  .subscribe((err) => {
    this.arrayService = err;
    console.log(this.arrayService)
    this.dataSourc = new MatTableDataSource(this.arrayService)
    this.dataSourc.paginator = this.paginator;
    this.dataSourc.sort = this.sort;
  });
  }

}
