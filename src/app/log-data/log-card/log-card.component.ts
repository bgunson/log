import { Component, Input, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log.model';

@Component({
  selector: 'app-log-card',
  templateUrl: './log-card.component.html',
  styleUrls: ['./log-card.component.css']
})
export class LogCardComponent implements OnInit {

  @Input() log: Log;

  constructor() { }

  ngOnInit(): void {
    
  }

}
