import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public auth: AngularFireAuth) { 
    //console.log("new auth service");
    auth.onAuthStateChanged(res =>{
      this.user = res;
    })

  }
}
