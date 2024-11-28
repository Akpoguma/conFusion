import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';


@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  dish!: Dish;
  promotion!:Promotion;
  featured!: Leader;


  constructor(private dishservice: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService){}

  ngOnInit(){
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionService.getFeaturedPromotion();
    this.featured = this.leaderService.getFeaturedLeader();
  }



}
