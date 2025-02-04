import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-menu',
  standalone: false,

  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations:[
      flyInOut(),
      expand()
    ]
})


export class MenuComponent implements OnInit {
  dishes!: Dish[];
  errMess!: string;

 

  constructor(private dishService: DishService,
    @Inject('BaseURL') public BaseURL:string) {
      
     }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes, (errMess) => 
      this.errMess =<any> errMess)

  }
 

}
