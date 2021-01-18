import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-log',
  templateUrl: './create-log.component.html',
  styleUrls: ['./create-log.component.css']
})
export class CreateLogComponent {

  numFields = 0;

  
  logform = new FormGroup({
    identifier: new FormControl(''),
    field1: new FormControl(''),
    value1: new FormControl(''),
  });
  
  /* this.fb.group({
  
    identifier: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    ],
    
    
  }); */


  states = [
    {name: 'Make'},
    {name: 'Model'},
    {name: 'Year'},
    {name: 'Name'},
    {name: 'Colour'},
    {name: 'Size'},
    {name: 'Usage'},
  ];

  constructor(private fb: FormBuilder) {}

  incrementFields() {
    this.numFields++;
    console.log(this.numFields);
  }

  selection(event) {
    console.log(event);
  }

  onSubmit() {
    console.warn(this.logForm);
  }
}
