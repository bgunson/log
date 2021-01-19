import { Component, ɵConsole } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/app';

@Component({
  selector: 'app-create-log',
  templateUrl: './create-log.component.html',
  styleUrls: ['./create-log.component.css']
})
export class CreateLogComponent {

  user: any;

  numFields = 0;

  fieldsAdded = [true, false, false, false, false]
  
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

  constructor(private fb: FormBuilder, private store: AngularFirestore, private auth: AngularFireAuth) {
    auth.authState.subscribe(user => {
      this.user = user;
    });
  }

  

  addField() {
    this.numFields++;
    var i;
    for (i = 0; i < this.fieldsAdded.length; i++) {
      if (this.fieldsAdded[i] == false) {
        this.fieldsAdded[i] = true;
        break;
      }
    }
  }

  removeField(index) {
    this.numFields -= 1;
    this.fieldsAdded[index] = false;
    
    this.logForm.get("value_" + index).reset();
    this.logForm.get("field_" + index).reset();

  }


  selection(event) {
    console.log(event);
  }

  onSubmit() {
    
    var logObject = this.logForm.getRawValue();
    alert("id: " + this.logForm.get('identifier').value +
          "\nfield_0: " + this.logForm.get('field_0').value +
          ", value_0: " + this.logForm.get('value_0').value +
          "\nfield_1: " + this.logForm.get('field_1').value +
          ", value_1: " + this.logForm.get('value_1').value +
          "\nfield_2: " + this.logForm.get('field_2').value +
          ", value_2: " + this.logForm.get('value_2').value +
          "\nfield_3: " + this.logForm.get('field_3').value +
          ", value_3: " + this.logForm.get('value_3').value +
          "\nfield_4: " + this.logForm.get('field_4').value +
          ", value_4: " + this.logForm.get('value_4').value
          );

    var id = this.logForm.get('identifier').value;
    

    // TODO: add object to firestore

    //this.store.collection('logs/${this.user.uid}').add(this.logForm.get('identifier').value);

    /* const userLogs = this.store.collection('app/logs/${this.user.uid}');
    userLogs. */
    /* this.store.collection('app/logs/${this.user.uid}').add({name: "test"}).then(function() {
      console.log("added to db");
    }).catch(function() {
      console.warn("couldnt add to db");
    });
     */

  }
}
