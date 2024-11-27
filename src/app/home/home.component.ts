import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  dish!: Dish;
  promotion!:Promotion;


  constructor(private dishservice: DishService,
     private promotionService: PromotionService){}

  ngOnInit(){
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionService.getFeaturedPromotion();
  }



}
