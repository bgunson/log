import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Log } from '../models/log.model';
import { AuthService } from './auth.service';

export interface LogDoc { logArray?: string[]; }

@Injectable({
  providedIn: 'root'
})
export class DbService {

  user: any;

  constructor(private store: AngularFirestore, private authService: AuthService) {
    console.log("new db service");
    this.user = authService.user;
  
  }

  addLog(log: Log) {
    let attributeObject = log.attributes;
    var docPath = `users/${this.user.uid}`;
    var logId: string = log.id;
    var userLogArray: string[] = [];

    // TODO: 
    // - put check box on form asking user whether ther new log should be theor default
    // - Check for existing collection(id) and warn user if one exists

    // For log array may not need
    /* this.store.doc(`logs/${this.user.uid}`).get().subscribe(ref => {
      if (ref.exists) {
        //console.log("found ref");
        userLogArray = ref.get('userLogs');
        userLogArray.push(logId);
        this.store.doc(`logs/${this.user.uid}`).update({
        userLogs: userLogArray
        });
      } else {
        userLogArray = [logId];
        this.store.doc(`logs/${this.user.uid}`).set({
          userLogs: userLogArray
        });      
      }
    }); */

    
    // Put log in users logs and set config
    this.store.doc(docPath).collection('logs').doc(logId).set(log).then(res => {
      console.log(res);
    }).catch(e => {
      console.log(e);
    });
  }

}
