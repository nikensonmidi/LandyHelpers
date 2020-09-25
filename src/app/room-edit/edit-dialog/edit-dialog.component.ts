import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectedRoom } from 'src/app/core/models/selectedRoom';




@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  record: SelectedRoom;
  optionsSection = true;
  commentSections = false;

  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.record = data;
  }

  ngOnInit() {}

  displayCommentSection(): void {
    this.optionsSection = false;
    this.commentSections = true;
  }
  returnToOptions(): void {
    this.optionsSection = true;
    this.commentSections = false;
  }
}
