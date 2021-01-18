import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthProvider} from 'ngx-auth-firebaseui';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showLogin: Boolean = true;

  title = 'log';

  providers = AuthProvider;

  constructor(public auth: AngularFireAuth) { }

  toggleView() {
    this.showLogin = !this.showLogin;
  }

  
  ngOnInit() {
  }

}
