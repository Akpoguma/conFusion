import { Component, Inject } from '@angular/core';
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
  promotion!: Promotion;
  featured!: Leader;


  constructor(private dishservice: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL:string) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe((dish) => this.dish = dish);
    this.promotionService.getFeaturedPromotion().then((promotion) => this.promotion = promotion);
    this.leaderService.getFeaturedLeader().then((featured) => this.featured = featured);
    console.log(this.BaseURL +this.dish.image)
  }



}
