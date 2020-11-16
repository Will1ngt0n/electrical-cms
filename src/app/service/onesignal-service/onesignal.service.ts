import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OnesignalService {
  url: string = 'https://onesignal.com/api/v1/notifications'
  apiID: string = 'e124b894-1cc7-4512-8c8f-456815b4f816'
  readonly root_url= 'https://jsonplaceholder.typicode.com/posts'
  posts: any
  constructor(private http: HttpClient) { }
  sendNotification() {
    try {
      return this.http.post(this.url, {
        api_id: this.apiID,
        headers: {'en': 'Invoice'},
        included_segments: ['Active Users'],
        content: {'en': 'An invoice for the requested services has been created and can now be downloaded'},
        data: {'url': 'https://getHttps.com/err', 'task': 'sent'}
      })
    } catch (error) {
      console.log(error);
      
    }

  }
  async noti() {
    // readonly root_url= 'https://jsonplaceholder.typicode.com/posts'
    this.posts = this.http.get(this.root_url)
    console.log(this.posts);
    console.log('we are in the service');
    return this.posts
  }
  
}
