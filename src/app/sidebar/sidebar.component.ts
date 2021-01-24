import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { CreateLogComponent } from '../create-log/create-log.component';
import { Log } from '../models/log.model';
import { User } from '../models/user.model';
import { AuthService } from '../auth.service';

export interface LogArray { userLogs: string[]; }

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  // TODO:
  // - query /logs/uid collections from db, display on side menu
  //    -> if none, show some sort of usage case in main area 
  // - load user default log to main content area
  //    -> if no sublogs (table, todo, etc) then show a widget style display
  //       giving the user choice of sublog they can create

  user: any;
  selectedLog: string; // init do 'default' in logs/uid - from localStorage
  userLogs: string[];
  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public auth: AngularFireAuth, private store: AngularFirestore,
    public dialog: MatDialog, private authService: AuthService
    ) {
      this.user = authService.user;
      console.log("uid: " + authService.user.uid);

      store.doc(`logs/${this.user.uid}`).get().subscribe(ref => {
        if (ref.exists) {
          //console.log(ref.get('userLogs'));
          this.userLogs = ref.get('userLogs');
        } else {
          this.userLogs = [];
        }
      });
      
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateLogComponent);
  }

}