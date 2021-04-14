import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { SccSkillService } from 'src/app/service/scc-skill.service';
import { AuthGuardService } from 'src/app/service/authguard.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})


export class InvoiceComponent implements OnInit {
  
  imgURL;
  text = "";
  key;
  keys;
  id;
  singleRequest : any;
  multipleRequest : any;
  multipleRequest1 : any;
  service : any = "";
  desc :any = "";
  flag;
  pic : any;
  task :  number;
  downloadU : any;
  uploadPercent: any;
  mainImage : any;
  userObj : any;
  costSingle=0;
  costM = [];
  listArr;
  sast = 0;
  request: object = {}

  constructor(private skill : SccSkillService,private afs: AngularFirestore, private addr: ActivatedRoute, private route: Router, private authService: AuthGuardService) { }

  ngOnInit() {
    this.addr.queryParams.subscribe(data => {
      this.key = data.key
    });
    this.skill.viewDetailRequest(this.key).subscribe((data: object) =>{
      this.request = data;
      // this.id = this.request.uid;
      console.log(this.request);
    })
  }

  declineRequest() {
    this.afs.collection('request').doc(this.key).update({
      status: 'Declined'
    })
    this.authService.declineRequest(this.key, this.request['uid'])
  }
  acceptRequest() {
    this.afs.collection('request').doc(this.key).update({
      status: 'Accepted'
    })
    this.authService.acceptRequest(this.key, this.request['uid'])
  }

  createInvoice() {
    this.route.navigate(['/main-nav/create-invoice'], {queryParams: {requestID: this.key}})
  }
}
