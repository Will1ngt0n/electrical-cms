import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as html2pdf from 'html2pdf.js'
import { SccSkillService } from 'src/app/service/scc-skill.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
  requestID: string = ''
  array: object = {}
  constructor(private activeRoute: ActivatedRoute, private skill: SccSkillService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe( (data: object) => {
      console.log(data);
      this.requestID = data['requestID']
      console.log(this.requestID);
      
    })
    this.skill.viewDetailRequest(this.requestID).subscribe((data: object) => {
      this.array = data;
      // this.id = this.array.uid;
      console.log(this.array);
    })
  }
  printPDF() {
    const content: Element  = document.getElementById('invoice')
    const options = {
      filename: `invoice-#${this.requestID}.pdf`,
      margin: [20,20],
      image: {type: 'jpeg'},
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    }
    console.log(content);
    // html2pdf().from(content).save()
    // console.log(html2pdf);
    html2pdf(content, options)
    
  }
}
