import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  rating: number = 2.7
  usersNo: number = 60
  reviews: Array<any> = []
  serviceID: string = ''
  collection: string = ''
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.serviceID = data.id
      console.log(data);
      this.collection = data.collection
      this.firestore.collection(this.collection).doc(this.serviceID).valueChanges().subscribe( (data: object) => {
        console.log(data);
        this.rating = data['averageRating']
        
      })
      this.firestore.collection(this.collection).doc(this.serviceID).collection('comments').valueChanges().subscribe( (reviews: Array<object>) => {
        console.log(reviews);
        this.reviews = reviews
        this.usersNo = reviews.length
      })
    } )
  }

}
