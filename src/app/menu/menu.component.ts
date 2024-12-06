import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  standalone: false,

  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  dishes!: Dish[];

 

  constructor(private dishService: DishService,
    @Inject('BaseURL') public BaseURL:string) {
      
     }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes)

  }
 

}
