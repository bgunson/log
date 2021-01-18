import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CreateLogComponent } from '../create-log/create-log.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  mes = "- You dont have any logs";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

<<<<<<< HEAD
  constructor(private breakpointObserver: BreakpointObserver, public auth: AngularFireAuth) { }
=======
  constructor(
    private breakpointObserver: BreakpointObserver, 
    public auth: AngularFireAuth, private store: AngularFirestore,
    public dialog: MatDialog
    ) {}

  openDialog() {
    const dialogRef = this.dialog.open(CreateLogComponent);
  }
>>>>>>> 234310689cb7f8237fdab43978f0b0358240b8f5


}