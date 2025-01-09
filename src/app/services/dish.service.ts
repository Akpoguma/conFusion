import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of } from 'rxjs';
import { delay } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})


export class DishService {

  constructor(private http :HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish []>(baseURL + 'dishes').pipe(delay(2000))
      .pipe (catchError(this.processHTTPMsgService.handleError));
    
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(delay(2000))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map((dishes)=>dishes[0]))
      .pipe(delay(2000))
      .pipe(catchError(this.processHTTPMsgService.handleError))  
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}


// getDishes(): Observable<Dish[]> {
//   return of(DISHES).pipe(delay (2000));
  
// }

// getDish(id: string): Observable<Dish> {
//   return of(DISHES.filter((dish) => dish.id === id)[0]).pipe(delay(2000));
// }

// getFeaturedDish(): Observable<Dish> {
//   return of (DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));

// }

// getDishIds(): Observable<string [] | any> {
//   return of(DISHES.map((dish)=> dish.id));
// }