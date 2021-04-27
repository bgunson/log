import { Component, OnInit } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showLogin: boolean = true;
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
