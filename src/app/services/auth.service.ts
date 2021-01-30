import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(public auth: AngularFireAuth) { 
    console.log("new auth service");
    auth.onAuthStateChanged(res =>{
      this.user = res;
    })

  }
}
