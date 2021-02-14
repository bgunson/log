import { Component, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AngularFireAuth } from '@angular/fire/auth';
import { Log } from '../models/log.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showSpinner: boolean = true;
  logRef: AngularFirestoreCollection<Log>;
  logs: Observable<Log[]>;
  cards: any[] = [];
  user: User;
  @Output() hasSelected = new EventEmitter<string>();
  

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private store: AngularFirestore) {
    this.user = authService.user;
  }

  onLogSelection(selection) {
    if (selection == 'new') {
      // open new log dialog
    } else {
      localStorage.setItem('selectedLog', selection);
    }
    this.hasSelected.emit(selection);
  }

  ngOnInit() {
    this.logRef = this.store.collection(`users/${this.user.uid}/logs`);
    this.logs = this.logRef.valueChanges();
    this.logs.subscribe((res) => {
      this.showSpinner = false;
      res.forEach(element => {
        this.cards.push({title: element.id, attr: element.attributes, cols: 1, rows: 1})
      }); 
    });
  }
}
