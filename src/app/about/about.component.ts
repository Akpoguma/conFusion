import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { Leaders } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  standalone: false,
  
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class AboutComponent {

  leaders!: Leader[]

  constructor(private leaderService: LeaderService) {};

  ngOnInit(){
    this.leaderService.getLeaders().then((leader)=>this.leaders= leader);
  }
}
