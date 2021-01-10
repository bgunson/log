import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthProvider} from 'ngx-auth-firebaseui';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'log';

  signedIn: Boolean = false;
  
  signInUser(credentials) {
    this.auth.signIn(credentials);
    this.signedIn = true;

    console.log(this.auth.user);
  }

  signOut() {
    this.signedIn = false;    
  }

  providers = AuthProvider;

  constructor(public auth: AuthService) { }

  
  ngOnInit() {
  }

}
