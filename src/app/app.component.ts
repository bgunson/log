import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthProvider} from 'ngx-auth-firebaseui';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showLogin: Boolean = true;

  title = 'log';

  providers = AuthProvider;

  constructor(public authService: AuthService) {
    
  }

  toggleView() {
    this.showLogin = !this.showLogin;
  }


  
  ngOnInit() {
  }

}
