import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import {Sort} from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {MatTableDataSource} from '@angular/material';
import { SccSkillService } from '../../service/scc-skill.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddServiceComponent } from '../add-service/add-service.component';
import {Router, ActivatedRoute} from '@angular/router';
export interface Food {
   calories: number;
   carbs: number;
   fat: number;
   name: string;
   protein: number;
}
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  @ViewChild(MatPaginator,  {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  dataSource: Food[] = [
    {name: 'Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclairs', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcakes', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbreads', calories: 356, fat: 16, carbs: 49, protein: 4},
 ];
 //displayedColumns: string[] = ['name', 'calories', 'fat', 'carbs','protein'];
  displayedColumns: string[] = ['name', 'surname','location','phone','actions'];
 array;
 dataSourc : any;
 animal: string;
 name: string;

 obj =" hello bamby";
 
  constructor(private route:Router, private nav : ActivatedRoute,private afs: AngularFirestore,private skillService : SccSkillService,public dialog: MatDialog) { }

  openDialog(arr): void {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
    console.log(arr);
    this.obj = arr;
    console.log(this.obj)
    this.route.navigate(['/'], {queryParams: {arr : JSON.stringify(arr)}});
  }


  try(arr){
    // this.skillService.updateService(arr);
    console.log(arr);
    // this.obj = arr;
    console.log(this.obj)
    this.route.navigate(['/addService'], {queryParams: {obj : this.obj}});
  }
  applyFilter(event) {

  }
  ngOnInit() {

    this.afs.collection('user/').snapshotChanges().subscribe((data: any) => {
      this.array = data.map(e => {
        return {
          key: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });

      console.log(this.array)
      this.dataSourc = new MatTableDataSource(this.array)
      this.dataSourc.paginator = this.paginator;
      this.dataSourc.sort = this.sort;
    })
  }

}
