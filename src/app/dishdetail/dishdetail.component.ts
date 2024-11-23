import { Component, Input } from '@angular/core';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  standalone: false,
  
  templateUrl: './dishdetail.component.html',
  styleUrl: './dishdetail.component.scss'
})
export class DishdetailComponent {

    @Input()
    dish!: Dish;




}
