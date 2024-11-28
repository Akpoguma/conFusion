import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-dishdetail',
  standalone: false,
  
  templateUrl: './dishdetail.component.html',
  styleUrl: './dishdetail.component.scss'
})
export class DishdetailComponent {

    id! :string
    dish!: Dish;

    constructor(private dishService: DishService,
      private location: Location,
      private route: ActivatedRoute){}

    ngOnInit (){
      this.id =this.route.snapshot.params['id']
      this.dish = this.dishService.getDish(this.id)
    }

    goBack(): void {
      this.location.back();
    }

    next (): void {
      this.location.forward();
    }

    




}
