import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Log } from '../models/log.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  user: any;

  constructor(private store: AngularFirestore, private authService: AuthService) { 
    this.user = authService.user;
  }


  addLog(log: Log) {
    console.log(log);

    let attributeObject = log.attributes;
    var docPath = `logs/${this.user.uid}`;
    var logId: string = log.id;
    var userLogArray: string[] = [];

    // TODO: 
    // - put check box on form asking user whether ther new log should be theor default
    // - Check for existing collection(id) and warn user if one exists

    this.store.doc(`logs/${this.user.uid}`).get().subscribe(ref => {
      if (ref.exists) {
        console.log("found ref");
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
    });

    
    
    // Put log in users logs and set config
    this.store.doc(docPath).collection(logId).doc('config').set({
      id: logId,
      attributes: attributeObject
    }).then(res => {
      console.log(res);
    }).catch(e => {
      console.log(e);
    });
  }

}
