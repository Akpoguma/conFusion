import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { Leaders } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  standalone: false,
  
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  leaders!: Leader[]

  constructor(private leaderService: LeaderService) {};

  ngOnInit(){
    this.leaders = this.leaderService.getLeaders();
  }


}
