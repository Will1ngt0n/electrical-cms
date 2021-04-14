import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.scss']
})
export class OutputGraphComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions : {};
    electric : any;
    plumbing : any;
    ict : any;
data : any;
scoreArr = [];
countE = 0;
countI = 0;
countP = 0;
wait : boolean = false;

 public options : any =  {
  chart: {
          // plotBackgroundColor: null,
          // plotBorderWidth: null,
          // plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Total request made, 2020'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
          }
      },
      
      series: [{
          name: 'Request',
          colorByPoint: true,
          data:[]
        }]
  };


  public options1: any = {
    chart: { type: 'column' },
    title: { text: 'Monthly Average Requests' },
    subtitle: { text: 'Source: SCC Dashboard' },
    xAxis: { categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ], crosshair: true },
    yAxis: { min: 0, title: { text: 'Requests ' } },
    tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                      '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
    },
    plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
    series: [{
    // no of requests made per month
      name: 'Electrical',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }, {
      // no of requests made per month
      name: 'Plumbing',
      data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

    }, {
      // no of requests made per month
      name: 'ICT',
      data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
    }]
  }

  
    public options2: any = {   
      data: { table: 'datatable' },
      chart: { type: 'column' },
      title: { text: 'Data extracted from a HTML table in the page' },
      yAxis: { allowDecimals: false, title: { text: 'Units' } },
      tooltip: { formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
            this.point.y + ' ' + this.point.name.toLowerCase();
          }
        }
      }
      
    public option: any = {
      data: { table: 'datatable' },
      chart: { type: 'line' },
      yAxis: { title: { text: 'Number of Employees' } },
      xAxis: { accessibility: { rangeDescription: 'Range: 2010 to 2017' } },
      plotOptions: { series: { label: { connectorAllowed: false }, pointStart: 2010 } },
      series: [{ name: 'Installation', data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]} ],
      responsive: { 
        rules: [{
          condition: { maxWidth: 500 },
          chartOptions: { legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom' } } 
        }]
      }
    }
  constructor(private afs: AngularFirestore, private route : Router) { }
 pass() {
  this.route.navigateByUrl('main-nav/widget-pie')
 }
  ngOnInit() {

    this.scoreArr.push([5,10,21,30,50,80])

    this.afs.collection('servicesPlumbing/').snapshotChanges().subscribe((ee) =>{
    this.plumbing = ee.map ( e => {
        return{
          key: e.payload.doc.id,
          ...e.payload.doc.data()  as any
        } ;
      });
      for(let item of this.plumbing)
    {
        // console.log(item.name + " has "+item.requestsMade + " requests made ..")
        this.countP += item.requestsMade;
    }
    console.log("total request for Plumbing : " + this.countP)
    });
      this.afs.collection('services/').snapshotChanges().subscribe((ee) =>{
        this.electric = ee.map ( e => {
            return{
              key: e.payload.doc.id,
              ...e.payload.doc.data()  as any
            } ;
          });
          for(let item of this.electric)
          {
            //   console.log(item.name + " has "+item.requestsMade + " requests made ..")
              this.countE += item.requestsMade;
            }
            console.log("total request for electric : " + this.countE)
        });
      this.afs.collection('serviceICT/').snapshotChanges().subscribe((ee) =>{
            this.ict = ee.map ( e => {
                return{
                  key: e.payload.doc.id,
                  ...e.payload.doc.data()  as any
                } ;
              });

              for(let item of this.ict)
              {
                //   console.log(item.name + " has "+item.requestsMade + " requests made ..")
                  this.countI += item.requestsMade;
                }
                console.log("total request for ICT : " + this.countI)
            });
    console.log(this.ict)

    setTimeout(() => {
      this.options.series[0].data = [{y: this.countP, name: "Plumbing"},{y: this.countE, name: "Electric"},{y: this.countI, name: "ICT"}];
      this.wait = true;
    }, 2000);
  
            
    // this.options1.series[0] = this.countP;
    // this.options1.series[1] = this.countE;
    // Highcharts.chart('container', this.options);
    // Highcharts.chart('container1', this.options1);
    // Highcharts.chart('container2', this.option);

    // Highcharts.chart()
    this.getGraphs()
    
          }
  async getGraphs() {
    await console.log('getting graphs')
    // electric
    this.afs.collection('requests/').doc('2020').collection('service').doc('requests').valueChanges().subscribe( (data: any) => {
    console.log(data);
      console.log(this.options1.series)
      console.log(this.options1.series[0].data);
      this.options1.series[0].data = [
        data.jan, data.feb, data.mar, data.apr, data.may, data.jun, data.jul, data.aug, data.sep, data.oct, data.nov, data.dec
      ]
      console.log(this.options1.series[0].data);

//plumbing
      this.afs.collection('requests/').doc('2020').collection('plumbingService').doc('requests').valueChanges().subscribe( (data: any) => {
        console.log(data);
          console.log(this.options1.series)
          console.log(this.options1.series[0].data);
          this.options1.series[1].data = [
            data.jan, data.feb, data.mar, data.apr, data.may, data.jun, data.jul, data.aug, data.sep, data.oct, data.nov, data.dec
          ]
          console.log(this.options1.series[0].data);
          
          /// ict
          this.afs.collection('requests/').doc('2020').collection('ICTService').doc('requests').valueChanges().subscribe( (data: any) => {
            console.log(data);
              console.log(this.options1.series)
              console.log(this.options1.series[0].data);
              this.options1.series[2].data = [
                data.jan, data.feb, data.mar, data.apr, data.may, data.jun, data.jul, data.aug, data.sep, data.oct, data.nov, data.dec
              ]
              console.log(this.options1.series[0].data);
              Highcharts.chart('container1', this.options1);
           })
       })
   })
   console.log('what the fuck');
   
   Highcharts.chart('container1', this.options1);
 }   

}
