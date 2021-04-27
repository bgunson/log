import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Log } from '../models/log.model';
import { User } from '../models/user.model';
import { CreateLogComponent } from '../create-log/create-log.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() logList: Log[];
  @Input() showSpinner: boolean;
  user: User;
  colSpan: number; 
  rowSpan: number; 
  rowSpanNew: number;
  @Output() hasSelected = new EventEmitter<string>();
  

  constructor(private breakpointObserver: BreakpointObserver, 
    public dialog: MatDialog) {
    //this.user = authService.user;

    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(res => {
        if (res.matches) {
          this.colSpan = 3;
          this.rowSpan = 6;
          this.rowSpanNew = 3;
        } else {
          this.colSpan = 1;
          this.rowSpan = 2;
          this.rowSpanNew = 2;
        }
      }
    );
  }

  onLogSelection(selection: string) {
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

  }
}
