import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor() { } 

  signIn(credentials) {

    const data = {
      uid: credentials.uid,
      email: credentials.email,
      displayName: credentials.displayName,
      photoURL: credentials.photoURL
    }

    this.user = data;
  
  }

  
}
