import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  isEmailVerified: boolean = false;

  constructor(public auth: AngularFireAuth) { 
    // Get the current auth state
    auth.onAuthStateChanged(res => {
      this.user = res;
      if (res.emailVerified) {
        this.isEmailVerified = true;
      } else {
        this.isEmailVerified = false;
      }
    })
  }

  
}
