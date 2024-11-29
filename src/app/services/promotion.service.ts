import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/PROMOTIONS';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS), 2000)
    })
  }

  getPromotion(): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.id)[0]), 2000);
    })
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    })
  }
}
