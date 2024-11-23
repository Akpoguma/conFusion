import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import {DISHES} from '../shared/dishes'

@Component({
  selector: 'app-menu',
  standalone: false,

  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  dishes = DISHES;
  selectedDish!: Dish;

  ngOnInit(): void {
    
  }
  onSelect(dish: Dish){
    this.selectedDish = dish
  }
   
}
