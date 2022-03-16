import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { DISHES } from '../shared/dishes';
import { Dish } from '../shared/dish';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError } from 'rxjs/operators';
import { ProsessHTTPMsgService } from './prosess-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient,
    private processHTTPMsgService:ProsessHTTPMsgService) { }

  submitFeedback(feedback : Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
   
    return this.http.post<Feedback>(baseURL + 'feedback', feedback,httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

}
