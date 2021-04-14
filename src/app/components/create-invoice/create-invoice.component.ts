import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as html2pdf from 'html2pdf.js'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { SccSkillService } from 'src/app/service/scc-skill.service';
import { AuthGuardService } from 'src/app/service/authguard.service';
import * as moment from 'moment'
@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
  @ViewChild('pdfForm', { static: false, read: ElementRef }) pdfForm: ElementRef; 
  requestID: string = ''
  array: object = {}
  date: string = ''
  constructor(private activeRoute: ActivatedRoute, private skill: SccSkillService, private authService: AuthGuardService) {

  }

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
    this.date = moment().format('LLLL')
    console.log(this.date);
    
  }
  changePrice(event: object, target: string, index: number) {
    let currentCost: number = 0
    if(this.array[target][index]['chargedCost'] !== undefined) {
      currentCost = Number(this.array[target][index]['chargedCost'])
    } else {
      currentCost = Number(this.array[target][index]['cost'])
    }
    let total: number = Number(this.array['cost']) - Number(currentCost)
    Object.assign(this.array[target][index], { chargedCost: Number(event['target']['value'])})
    total += Number(event['target']['value'])
    Object.assign(this.array, { cost: total })
    console.log(this.array[target][index]);
  }
  async printPDFs() {
    var data = document.getElementById('pdfDownload');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      alert(imgHeight)
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      //  pdf.save('new-file.pdf');
      window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
    });
        
    // const doc = new jsPDF()
    // doc.text(content)
    // console.log(doc);
    
    // var worker = await html2pdf().set(options).from(content).toPdf().save().output('datauristring').then((uri: any) => {
    //   console.log(uri);
    //   return uri
    // })
    // var worker = await html2pdf().set(options).from(content).toPdf().output('blob').then((uri: any) => {
    //   console.log(uri);
    //   return uri
    // })
  }
  async printPreview() {
    let { options, content } = await this.createCanvass()
    console.log(options, content);
    await html2pdf().set(options).from(content).toPdf().save()
  }
  async printPDF() {
    let { options, content } = await this.createCanvass()
    let worker = await html2pdf().set(options).from(content).toPdf().output('blob').then( (data: Blob) => {
      console.log(data);
      return data
    })
    console.log(worker, 'worker');
    console.log(this.array);
    
    this.authService.postInvoice(this.requestID, worker, this.array['uid'], this.array)
  }
  async createCanvass() {
    const content: Element  = this.pdfForm.nativeElement
    const options = {
      filename: `invoice-#${this.requestID}.pdf`,
      margin: [0, 0],
      image: {type: 'png', quality: 1 },
      html2canvas: { dpi: 400, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    return {options: options, content: content}
  }
  close() {
    this.authService.closeRequest(this.requestID, this.array['uid'])
  }
}
