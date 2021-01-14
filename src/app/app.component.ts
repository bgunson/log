import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthProvider} from 'ngx-auth-firebaseui';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'log';

  providers = AuthProvider;

  constructor() { }

  
  ngOnInit() {
  }

}
