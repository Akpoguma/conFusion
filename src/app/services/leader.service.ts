import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { of, delay, Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    private ProcessHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader []>(baseURL + 'leadership').pipe(delay(2000))
      .pipe(catchError (this.ProcessHTTPMsgService.handleError)); 
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map((leader)=>leader[0]))
      .pipe(delay(2000))
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
}


// getLeaders(): Promise<Leader[]> {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(Leaders), 2000);
//   })
// }

// getFeaturedLeader(): Promise<Leader> {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(Leaders.filter((leader) => leader.featured)[0]), 2000);
//   })
// }
