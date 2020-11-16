import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SccSkillService } from 'src/app/service/scc-skill.service';
import { StoreInvoiceService } from 'src/app/service/store-invoice.service';

@Component({
  selector: 'app-request-m-detail',
  templateUrl: './request-m-detail.component.html',
  styleUrls: ['./request-m-detail.component.scss']
})
export class RequestMDetailComponent implements OnInit {
key;
array;
flag : boolean = true;
arrayOfeleObj: any [] = [];
arrayOfictObj: any [] = [];
  constructor( private _invoiceService: StoreInvoiceService,private addr: ActivatedRoute,private sccskills :SccSkillService,private route : Router) { }


  details(){
    this.sccskills.viewDetailRequest(this.key).subscribe((data) =>{
      this.array =data;
      this._invoiceService.storeUserObj(data);
      console.log(this.array)
      this.arrayOfictObj= this.array.ictObj;
      
      console.log(this.arrayOfictObj);
      this.arrayOfeleObj= this.array.eleObj;
      
      console.log(this.arrayOfeleObj);
      // for(let array of this.array.ictObj) {
        
        
      // }
      // for(let array of this.array.eleObj) {
      //   console.log(array)
      // }

    })
    // console.log(this.arrayOfObjects)
  }
  next(){
    this._invoiceService.storeInvoiceM(this.arrayOfictObj,this.arrayOfeleObj);
    this.route.navigate(['main-nav/invoice'],{queryParams : {flag :this.flag, key: this.key}});
  }

  ngOnInit() {
    this.addr.queryParams.subscribe(data => {
      this.key = data.key;
      console.log(this.key)
    });
    this. details();
  }

}
