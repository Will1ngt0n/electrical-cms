import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
export interface ListServiceItem {
  key: string;
  refNo: string;
  stamp: string;
}
@Component({
  selector: 'app-request-m',
  templateUrl: './request-m.component.html',
  styleUrls: ['./request-m.component.scss']
})
export class RequestMComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  total : number = 0;
  obj : any = [];

  arrayOfObjects: any [] = []
  dataSourc: ListServiceItem[] = [
    { key: "1", refNo: "1", stamp: '2020-01-19' },
    { key: "2", refNo: "2", stamp: '2020-01-19' }
  ];
  array = [];
  displayedColumns: string[] = ['key', 'refNo', 'stamp'];
  dataSource: MatTableDataSource<any>;
  listArr;
  constructor(private afs: AngularFirestore,private route : Router) { }


  navigate(id: string){
    console.log(id)
    this.route.navigate(['main-nav/request-m-detail/'], {queryParams : {key: id}});
  }
  ngOnInit() {
    this.afs.collection('request/').snapshotChanges().subscribe((aa: any) => {
      this.listArr = aa.map(e => {
        const data = e.payload.doc.data() as any;
        const  id =  e.payload.doc.id;
        return {
       id,... data
        }
      });
      this.array = aa;
      for (let listArr of this.listArr) {
        if (listArr.eleObj && listArr.ictObj) {
          this.obj = listArr;
          this.arrayOfObjects.push(this.obj)
        }
      }
      console.log(this.arrayOfObjects)
      this.dataSource = new MatTableDataSource(this.arrayOfObjects)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

}
