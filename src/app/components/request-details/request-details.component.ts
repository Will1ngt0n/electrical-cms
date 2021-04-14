import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SccSkillService } from 'src/app/service/scc-skill.service';
import { StoreInvoiceService } from 'src/app/service/store-invoice.service';
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  key : string;
  array: object = {
    // uid : '',
  };
  flag : boolean = false;
  listArr : any;
  id : string;
  constructor(private addr: ActivatedRoute,private sccskills :SccSkillService, private route : Router, private _invoiceService: StoreInvoiceService) { }

  details(){
    this.sccskills.viewDetailRequest(this.key).subscribe((data: object) =>{
      this.array = data;
      console.log(this.array);
    })
  }
  navigate(){
    console.log('test');
    this._invoiceService.storeInvoice("");
    this._invoiceService.storeInvoice(this.array);
    this.route.navigate(['main-nav/invoice'], {queryParams : {flag :this.flag, key: this.key}});
  }
  ngOnInit() {
    this.addr.queryParams.subscribe(data => {
      this.key = data.key;
      console.log(this.key)
    });
    this. details();
  }
}
