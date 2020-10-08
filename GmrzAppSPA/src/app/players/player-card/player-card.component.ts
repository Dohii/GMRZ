import { Component, Input, OnInit } from '@angular/core';

import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {
  @Input() user:User;


  constructor() { }

  ngOnInit() {
  }

}
