import { Component, ɵConsole } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-log',
  templateUrl: './create-log.component.html',
  styleUrls: ['./create-log.component.css']
})
export class CreateLogComponent {

  user: any;

  numFields = 0;

  fieldsAdded = [true, false, false, false, false]

  // TODO: add form control to default checkbox
  
  logForm = this.fb.group({
  
    identifier: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    ],
    field_0: [''],
    value_0: [''],
    field_1: [''],
    value_1: [''],
    field_2: [''],
    value_2: [''],
    field_3: [''],
    value_3: [''],
    field_4: [''],
    value_4: [''],
  });


  fields = [
    {name: 'Category'},
    {name: 'Class'},
    {name: 'Colour'},
    {name: 'Description'},
    {name: 'Key'},
    {name: 'Location'},
    {name: 'Make'},
    {name: 'Model'},
    {name: 'Name'},
    {name: 'Size'},
    {name: 'Time'},
    {name: 'Type'},
    {name: 'Usage'},
    {name: 'Year'},
  ];

  constructor(private fb: FormBuilder, private store: AngularFirestore, private authService: AuthService) {

    this.user = authService.user;
    
  }

  

  addField() {
    this.numFields++;
    for (var i = 0; i < this.fieldsAdded.length; i++) {
      if (this.fieldsAdded[i] == false) {
        this.fieldsAdded[i] = true;
        break;
      }
    }
  }

  removeField(index: number) {
    this.numFields -= 1;
    this.fieldsAdded[index] = false;
    
    this.logForm.get("value_" + index).reset();
    this.logForm.get("field_" + index).reset();
  }


  selection(event) {
    console.log(event);
  }


  onSubmit() {
    
    const docPath = `logs/${this.user.uid}`;
    const logId: string = this.logForm.get('identifier').value;
    var userLogs: string[] = [];

  

    // Make sure we are only added non-empty fields/values to logData object

    let attributeObject = {};


    for (var i = 0; i < this.fieldsAdded.length; i++) {
      let f: string = this.logForm.get('field_' + i).value
      if (this.fieldsAdded[i] && f != "") {
        attributeObject[f] = this.logForm.get('value_' + i).value
      }
    }


    // TODO: 
    // - put check box on form asking user whether ther new log should be theor default
    // - Check for existing collection(id) and warn user if one exists
    // - Set validators for value_i if field_i onSelectionChange()
    // - store user defined default login local storage
    // - try to query collection ids instead of storing log array at 'logs/uid' doc

    this.store.doc(`logs/${this.user.uid}`).get().subscribe(ref => {
      if (ref.exists) {
        //console.log(ref.get('userLogs'));
        userLogs = ref.get('userLogs');
        userLogs.push(logId);
        this.store.doc(`logs/${this.user.uid}`).update({
        userLogs: userLogs
        });
      } else {
        userLogs.push(logId);
        this.store.doc(`logs/${this.user.uid}`).set({
          userLogs: userLogs
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
