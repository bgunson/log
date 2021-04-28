import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
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

  showDashboard: boolean = true;              // Whether to show the log selection screen
  user: User;                                 // The current user
  showSpinner: boolean = true;                // Show the loading spinner when true    
  sL: Log;                                    // The selected Log in localStorage
  logRef: AngularFirestoreCollection<Log>;    // Reference to the user's logs in the db
  logList: Log[];                             // Local array to store the list of logs

  constructor(private authService: AuthService, private store: AngularFirestore, public dialog: MatDialog) {
    // Check for a selected log in localStorage
    this.sL = JSON.parse(localStorage.getItem('sL'));
    // Get the current user form the aiuth service
    this.user = this.authService.user;
    //console.log("email verified: " + this.authService.isEmailVerified);

  }

  /**
   * When a user wishes to add a new log, open the create-log component in a dialog popup
   */
  openDialog() : void {
    // TODO: when user clicks off dialog wihtoout inputting anything make sure we stay at dashboard
    const dialogRef = this.dialog.open(CreateLogComponent, {
      data: this.logList
    });
    dialogRef.afterClosed().subscribe(() => {
      this.sL = JSON.parse(localStorage.getItem('sL'));
    })
  }

  /**
   * Navigate to the log selection screen under assumption user is choosing different log
   * so clear local storage (selected Log)
   */
  toDashboard() : void {
    localStorage.clear();
    this.showDashboard = true;
  }

  /**
   * Handle event when user chooses a different log from the top right dropdown
   * 
   * @param selected  the Log object the user selected from the list 
   */
  onLogSelectionChange(selected: Log) : void {
    this.sL = selected;
    localStorage.setItem('sL', JSON.stringify(selected));
  }

  /**
   * Handle event when user signs out of the app so clear local storage of the selected Log
   */
  userSignedOut() : void {
    this.showDashboard = true;
    localStorage.clear();
  }

  /**
   * Callback function that is fired when a user selects a log from the log selection screen child component
   * 
   * @param event the Log that was selected as an arg
   */
  userSelected(event: Log) {
    this.sL = event;
    this.showDashboard = false;
  }

  /**
   * Check for a selected log in local storage, show the log selection screen accordingly. Then read from the db for 
   * the user's Logs and subscribe to that ref.
   */
  ngOnInit(): void {
    if (this.sL) {
      this.showDashboard = false;
    } else {
      this.showDashboard = true;
    }

    this.logRef = this.store.collection(`users/${this.user.uid}/logs`);
    this.logRef.valueChanges().subscribe(res => {
       this.logList = res;
       this.showSpinner = false;
     });
  }

}
