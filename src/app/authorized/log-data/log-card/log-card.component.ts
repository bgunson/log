import { Component, Input, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-log-card',
  templateUrl: './log-card.component.html',
  styleUrls: ['./log-card.component.css']
})
export class LogCardComponent implements OnInit {

  @Input() log: Log;

  constructor(public db: DbService) { }

  ngOnInit(): void {
    
  }

}
