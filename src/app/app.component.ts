import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'candidate-dynamic-form';
  candidateForm!:FormGroup
  hobbiesList!:any

  constructor(private fb:FormBuilder){}

  ngOnInit(){
   this.candidateForm =  this.fb.group({
     name:['',Validators.required],
     hobbies:this.fb.array([this.createHobbies()])
   })
   this.hobbiesList = this.candidateForm.get('hobbies') as any;
  }

  // parent create hobbies
  createHobbies():FormGroup{
    return this.fb.group({
     hobbieName:[null,Validators.required],
     childHobbies:this.fb.array([])      
    })
  }

  // parent hobbies
  addHobbies(){
   return this.hobbiesList.push(this.createHobbies())
   }
   

   get hobbiesFormGroup(){
    return this.candidateForm.controls['hobbies'] as FormArray;
   }

   deleteHobbies(index:number){
    this.hobbiesList.removeAt(index)
   }

  // child hobbies
   hobbies(): FormArray {
     return this.candidateForm.get("hobbies") as FormArray
   }

   getChildHobbies(index:number):FormArray{
    return this.hobbies().at(index).get("childHobbies") as FormArray
  }

  createChildForm():FormGroup{
    return this.fb.group({
      childHobbieName:[''],
    })
  }

  addChildHobbies(index:number){
    this.getChildHobbies(index).push(this.createChildForm())
  }

  deleteChildHobbies(parentIndex:number,childHobbieIndex:number){
        this.getChildHobbies(parentIndex).removeAt(childHobbieIndex) 
  }

  innerChildHobbies(index:number){
     var textfield = document.createElement("input");
        textfield.type = "text";
        textfield.value = "";
        var video = <HTMLFormElement>document.querySelector('#uniqueDiv')
        video.append(textfield)
  }

  //submit
  submit(){
    console.log(this.candidateForm.value)
  }

}
