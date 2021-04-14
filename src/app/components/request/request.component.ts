import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import { AuthGuardService } from 'src/app/service/authguard.service';
export interface ListServiceItem {
  refNo: string;
  stamp: string;
  requests: number;
  cost: number;
  status: string
}


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})

export class RequestComponent implements OnInit {
  @ViewChild(MatPaginator,  {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  arrayOfObjects: any [] = [];
  // dataSourc : ListServiceItem[] = [
  //   {refNo: "1", stamp: '2020-01-19',requests: 5, cost: 5,   status: 'Pending'}
  // ];
  array =[];
  displayedColumns: string[] = ['refNo','stamp', 'requests', 'cost', 'status'];
  dataSource :MatTableDataSource<any>;
  constructor(private route : Router, private authService: AuthGuardService) { }
  navigate(id: string){
    console.log(id)
    this.route.navigate(['main-nav/invoice'],{queryParams : { key: id}});
  }
  ngOnInit() {
    this.fetchRequests()
  }
  fetchRequests() {
    this.authService.fetchRequests().subscribe( (data: Array<object>) => {
      console.log(data);
      this.arrayOfObjects = data
      this.dataSource = new MatTableDataSource(this.arrayOfObjects)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
