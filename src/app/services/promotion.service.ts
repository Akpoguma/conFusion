import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/PROMOTIONS';
import { Observable, catchError, map, delay } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
      private processHTTPMMSG : ProcessHTTPMsgService
   ) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions').pipe(delay(2000))
      .pipe(catchError(this.processHTTPMMSG.handleError));
  }

  getPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions/').pipe(delay(2000))
      .pipe(map((promotion)=> promotion[0]))
      .pipe(catchError(this.processHTTPMMSG.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
      .pipe(delay(2000))
      .pipe(map((promotion)=>promotion [0]))
      .pipe(catchError(this.processHTTPMMSG.handleError));
    
  }
}


// getPromotions(): Promise<Promotion[]> {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(PROMOTIONS), 2000)
//   })
// }

// getPromotion(): Promise<Promotion> {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.id)[0]), 2000);
//   })
// }

// getFeaturedPromotion(): Promise<Promotion> {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
//   })
// }