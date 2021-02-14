import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {AuthProvider} from 'ngx-auth-firebaseui';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { Log } from './models/log.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showLogin: boolean = true;
  showSelector: boolean;
  user: User;
  showSpinner: boolean = true;
  selectedLog: string;

  title = 'log';

  providers = AuthProvider;

  constructor(public authService: AuthService, public store: AngularFirestore) {
    this.selectedLog = localStorage.getItem('selectedLog');
  }

  toggleView() {
    this.showLogin = !this.showLogin;
  }

  userSignedOut() {
    this.showSelector = true;
    localStorage.clear();
  }

  userSelected(event) {
    this.selectedLog = event;
    this.showSelector = false;
  }


  ngOnInit() {
    this.selectedLog = localStorage.getItem('selectedLog');
    if (this.selectedLog) {
      this.showSelector = false;
    } else {
      this.showSelector = true;
    }
  }

}
