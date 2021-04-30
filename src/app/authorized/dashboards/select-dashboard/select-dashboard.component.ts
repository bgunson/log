import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Log } from '../../../models/log.model';
import { CreateLogComponent } from '../../dialogs/create-log/create-log.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-select-dashboard',
  templateUrl: './select-dashboard.component.html',
  styleUrls: ['./select-dashboard.component.css'],
})
export class SelectDashboardComponent implements OnInit {

  @Input() logList: Observable<Log[]>;
  @Input() showSpinner: boolean;
  colSpan: number; 
  rowSpan: number; 
  rowSpanNew: number;
  @Output() hasSelected = new EventEmitter<Log>();
  

  constructor(private breakpointObserver: BreakpointObserver, 
    public dialog: MatDialog) {

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

  openCreateDialog() : void {
    const dialogRef = this.dialog.open(CreateLogComponent, {
      data: this.logList
    });
  }

  onLogSelection(selection: Log) {
    localStorage.setItem('sL', JSON.stringify(selection));
    this.hasSelected.emit(selection);
  }

  ngOnInit() {

  }
}
