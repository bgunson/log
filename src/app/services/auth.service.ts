import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authedUser: Boolean;
  user: User;

  

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore
  ) { 

    
    
  }
  

  signIn(credentials) {

    const data = {
      uid: credentials.uid,
      email: credentials.email,
      displayName: credentials.displayName,
      photoURL: credentials.photoURL
    }
    
    
  
  }

  signOut() {
    
  }

  
}
