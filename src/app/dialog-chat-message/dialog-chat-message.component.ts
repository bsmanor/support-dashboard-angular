import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-dialog-chat-message',
  templateUrl: './dialog-chat-message.component.html',
  styleUrls: ['./dialog-chat-message.component.css']
})
export class DialogChatMessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogChatMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
