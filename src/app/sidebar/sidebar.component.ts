import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { CreateLogComponent } from '../create-log/create-log.component';

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

  mes = "- You dont have any logs";
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  
  user: any;
  selectedLog: string; // init do 'default' in logs/uid
  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public auth: AngularFireAuth, private store: AngularFirestore,
    public dialog: MatDialog
    ) {
      auth.authState.subscribe(user => {
        this.user = user;
      });

      
    }

  

  openDialog() {
    const dialogRef = this.dialog.open(CreateLogComponent);
  }


}