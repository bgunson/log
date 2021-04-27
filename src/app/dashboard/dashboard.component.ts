import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Log } from '../models/log.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CreateLogComponent } from '../create-log/create-log.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showSpinner: boolean = true;
  logRef: AngularFirestoreCollection<Log>;
  logs: Observable<Log[]>;
  logList: Log[];
  cards: any[] = [];
  user: User;
  colSpan: number; 
  rowSpan: number; 
  rowSpanNew: number;
  @Output() hasSelected = new EventEmitter<string>();
  

  constructor(private breakpointObserver: BreakpointObserver, 
    public dialog: MatDialog,
    private authService: AuthService, private store: AngularFirestore) {
    this.user = authService.user;

    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(res => {
        if (res.matches) {
          this.colSpan = 3;
          this.rowSpan = 7;
          this.rowSpanNew = 4;
        } else {
          this.colSpan = 1;
          this.rowSpan = 2;
          this.rowSpanNew = 2;
        }
      }
    );
  }

  onLogSelection(selection) {
    if (selection == 'new') {
      // open new log dialog, emit new creation, goto main screen
      const dialogRef = this.dialog.open(CreateLogComponent, {
        data: this.logList
      });
      dialogRef.afterClosed().subscribe(() => {
        this.hasSelected.emit(localStorage.getItem('selectedLog'))
      })
    } else {
      localStorage.setItem('selectedLog', selection);
      this.hasSelected.emit(selection);
    }
  }

  ngOnInit() {

    

    this.logRef = this.store.collection(`users/${this.user.uid}/logs`);
    this.logs = this.logRef.valueChanges();
    this.logs.subscribe((res) => {
      this.logList = res;
      this.showSpinner = false;
    });
  }
}
