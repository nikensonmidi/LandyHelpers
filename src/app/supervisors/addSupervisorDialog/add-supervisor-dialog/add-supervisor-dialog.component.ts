import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  humanizeBytes,
  UploadFile,
  UploadInput,
  UploadOutput,
} from 'ng-uikit-pro-standard';
import { Supervisor } from 'src/app/core/models/supervisor';

@Component({
  selector: 'app-add-supervisor-dialog',
  templateUrl: './add-supervisor-dialog.component.html',
  styleUrls: ['./add-supervisor-dialog.component.scss'],
})
export class AddSupervisorDialogComponent implements OnInit {
  newSupervisor: Supervisor;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  form: FormGroup;
  humanizeBytes: (bytes: number) => string;
  dragOver: boolean;
  file: File;
  constructor(
    private dialogRef: MatDialogRef<AddSupervisorDialogComponent>,
    private fb: FormBuilder
  ) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
    this.newSupervisor = new Supervisor();
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      fullName: [this.newSupervisor.fullName],
      photoUrl: [this.newSupervisor.photoUrl],
    });
  }
  saveSupervisor(): void {
    const result = this.form.value as Supervisor;
    this.dialogRef.close(result);
  }


onFileAdd(file: File) {
  this.file = file;
  }

  onFileRemove() {
  this.file = null;
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'your-path-to-backend-endpoint',
      method: 'POST',
      data: { foo: 'bar' },
    };
    this.files = [];
    this.uploadInput.emit(event);
  }

  showFiles() {
    let files = '';
    for (let i = 0; i < this.files.length; i++) {
      files += this.files[i].name;
      if (!(this.files.length - 1 === i)) {
        files += ',';
      }
    }
    return files;
  }

  onUploadOutput(output: UploadOutput | any): void {
    if (output.type === 'allAddedToQueue') {
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex((file) => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter(
        (file: UploadFile) => file !== output.file
      );
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    this.showFiles();
  }
}
