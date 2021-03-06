import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError } from 'rxjs/operators';
import { ProsessHTTPMsgService } from './prosess-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    private processHTTPMsgService:ProsessHTTPMsgService) { }



  getLeaders():Observable<Leader[]>{
  
  return  this.http.get<Leader[]>(baseURL+'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  
  }

  getLeader(id : string): Observable<Leader>{  
 

  return this.http.get<Leader>(baseURL+'leadership/'+id)
  .pipe(catchError(this.processHTTPMsgService.handleError));

}
  getLeaderDish(): Observable<Leader>{
 

return this.http.get<Leader[]>(baseURL+'leadership?featured=true')
.pipe(map(leadr => leadr[0]))
.pipe(catchError(this.processHTTPMsgService.handleError));

}

  }