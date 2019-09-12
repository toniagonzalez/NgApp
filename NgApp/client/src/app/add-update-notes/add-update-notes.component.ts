import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-update-notes',
  templateUrl: './add-update-notes.component.html',
  styleUrls: ['./add-update-notes.component.css']
})
export class AddUpdateNotesComponent implements OnInit {
  @Output() noteCreated = new EventEmitter<any>();
  @Input() note: any;
  @Input() isViewable: boolean;
  constructor() {
    this.clearNotes();
  }
  ngOnInit() {
    this.isViewable = true;
  }
 
  // Create an empty note object
  private clearNotes = function () {
    this.note = {
      id: undefined,
      title: '',
      description: ''
    };
  };
  public addUpdateNote = function(event) {
    this.noteCreated.emit(this.note);
    this.clearNotes();
    this.isViewable = false;
  };

}
