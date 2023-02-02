import { User } from './../../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  isAddMode: boolean;
  user: User;
  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent, User>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.user = data.user;
    this.isAddMode = data.isAddMode;

    this.createForm = this.formBuilder.group({
      name: [this.user?.name, [Validators.required]],
      age: [this.user?.age, [Validators.required]],
    });
  }

  submit(): void {
    if (!this.createForm.valid) return;
    this.dialogRef.close({ ...this.user, ...this.createForm.value });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
