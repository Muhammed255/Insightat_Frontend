import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

@Component({
  selector: 'app-validation-message-dialog',
  templateUrl: './validation-message-dialog.component.html',
  styleUrls: ['./validation-message-dialog.component.css']
})
export class ValidationMessageDialogComponent implements OnInit {

  @Input('message') message
  @Input('icon') icon;

  constructor( public dialogRef: MatDialogRef<ValidationMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  confirm() {
    let res = true
    this.dialogRef.close(res);
  }

  cancel(){
    let res = false;
    this.dialogRef.close(res);

  }

}
