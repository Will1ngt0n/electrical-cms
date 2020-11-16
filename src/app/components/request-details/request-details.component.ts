import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SccSkillService } from 'src/app/service/scc-skill.service';
import { StoreInvoiceService } from 'src/app/service/store-invoice.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
key : string;
array = {
  // uid : '',
};
flag : boolean = false;
listArr : any;
id : string;
  constructor(private afs: AngularFirestore,private addr: ActivatedRoute,private sccskills :SccSkillService,
    private route : Router, private _invoiceService: StoreInvoiceService) { }


  details(){
    this.sccskills.viewDetailRequest(this.key).subscribe((data) =>{
      this.array =data;
      // this.id = this.array.uid;
      console.log(this.array);
    })

  
      // this.sccskills.viewDetailRequest(this.key).subscribe((data) =>{
      //   this.array =data;
      //   this._invoiceService.storeUserObj(data);
      //   console.log(this.array)
      //   this.arrayOfictObj= this.array.ictObj;
        
      //   console.log(this.arrayOfictObj);
      //   this.arrayOfeleObj= this.array.eleObj;
        
      //   console.log(this.arrayOfeleObj);
      //   // for(let array of this.array.ictObj) {
          
          
      //   // }
      //   // for(let array of this.array.eleObj) {
      //   //   console.log(array)
      //   // }
  
      // })
  }
  next(){
    console.log('test');
    this._invoiceService.storeInvoice("");
    this._invoiceService.storeInvoice(this.array);
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
