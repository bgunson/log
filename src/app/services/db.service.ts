import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Log } from '../models/log.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  user: User;

  constructor(private store: AngularFirestore, private authService: AuthService) {
    this.user = authService.user; 
  }

  deleteLog(log: Log) : void {
    let logId: string = log.id;

    this.store.collection(`users/${this.user.uid}/logs`).doc(logId).delete().then(res => {
      console.log(res);
    }).catch(e => {
      alert("An error occured while tring to delete " + logId + ". Please try again leter.")
    })
  }

  addLog(log: Log) : void {

    let logId: string = log.id;
    
    // Put log in users logs and set config
    this.store.collection(`users/${this.user.uid}/logs`).doc(logId).set(log).then(res => {
      console.log(res);
    }).catch(e => {
      console.log(e);
    });
  }

}
