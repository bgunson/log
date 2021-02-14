import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CreateLogComponent } from '../create-log/create-log.component';
import { Log } from '../models/log.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

  showDashboard: boolean = true;
  user: User;
  showSpinner: boolean = true;
  selectedLog: string;
  logRef: AngularFirestoreCollection<Log>;
  logs: Observable<Log[]>;
  logList: Log[];

  constructor(private authService: AuthService, private store: AngularFirestore, public dialog: MatDialog) { 
    this.user = this.authService.user;
  }

  /**
   * When a user wishes to add a new log, open the create-log component in a dialog popup
   */
  openDialog() {
    const dialogRef = this.dialog.open(CreateLogComponent, {
      data: this.logList
    });
    dialogRef.afterClosed().subscribe(() => {
      this.selectedLog = localStorage.getItem('selectedLog');
    })
  }

  toDashboard() {
    localStorage.clear()
    this.showDashboard = true;
  }

  onLogSelectionChange(selected) {
    this.selectedLog = selected.id;
    localStorage.setItem('selectedLog', selected.id);
  }

  userSignedOut() {
    this.showDashboard = true;
    localStorage.clear();
  }

  userSelected(event) {
    this.selectedLog = event;
    this.showDashboard = false;
  }

  ngOnInit(): void {
    this.selectedLog = localStorage.getItem('selectedLog');
    if (this.selectedLog) {
      this.showDashboard = false;
    } else {
      this.showDashboard = true;
    }

    this.selectedLog = localStorage.getItem('selectedLog');
    this.logRef = this.store.collection(`users/${this.user.uid}/logs`);
    this.logs = this.logRef.valueChanges();
    this.logs.subscribe(res => {
      this.logList = res;
      this.showSpinner = false;
    });
  }

}
