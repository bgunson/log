import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { CreateLogComponent } from '../create-log/create-log.component';
import { AuthService } from '../services/auth.service';
import { Log } from '../models/log.model';
import { User } from '../models/user.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  // TODO:
  // - load user default log to main content area
  //    -> if no sublogs (table, todo, etc) then show a widget style display
  //       giving the user choice of sublog they can create
  // - On page referesh, dont want to go back to selector

  user: User;
  logRef: AngularFirestoreCollection<Log>;
  logs: Observable<Log[]>;
  logList: Log[];
  showSpinner: boolean = true;
  selectedLog: string; 
  
  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public store: AngularFirestore,
    public dialog: MatDialog, 
    public authService: AuthService
    ) { 
      this.user = authService.user;
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

  
  onLogSelectionChange(selected) {
    this.selectedLog = selected.id;
    localStorage.setItem('selectedLog', selected.id);
  }

  ngOnInit() {
    this.selectedLog = localStorage.getItem('selectedLog');
    this.logRef = this.store.collection(`users/${this.user.uid}/logs`);
    this.logs = this.logRef.valueChanges();
    this.logs.subscribe(res => {
      this.logList = res;
      this.showSpinner = false;
    });
  }

}