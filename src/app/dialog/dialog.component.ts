import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  doneList = ["Not Done", "Done"];
  todoForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder, private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      todoLabel: ['', Validators.required],
      priority: ['', Validators.required],
      done: ['', Validators.required]
    })
    if(this.editData){
      this.actionBtn = "Update";
      this.todoForm.controls['todoLabel'].setValue(this.editData.todoLabel);
      this.todoForm.controls['priority'].setValue(this.editData.priority);
      this.todoForm.controls['done'].setValue(this.editData.done);
    }
  }

  addTodo(){
    if(!this.editData){
      if(this.todoForm.valid) {
        this.api.postTodo(this.todoForm.value)
        .subscribe({
          next: (res)=>{
            alert("Todo added successfully");
            this.todoForm.reset();
            this.dialogRef.close('save');
          },
          error: ()=>{
            alert("Error while addind the todo")
          }
        })
      }
    }else {
      this.updateTodo()
    }
  }

  updateTodo() {
    this.api.putTodo(this.todoForm.value, this.editData.id)
    .subscribe({
      next: (res)=>{
        alert("Todo updated successfully");
        this.todoForm.reset();
        this.dialogRef.close('update');
      },
      error: ()=>{
        alert("Error while updating the record!!");
      }
    })
  }

}
