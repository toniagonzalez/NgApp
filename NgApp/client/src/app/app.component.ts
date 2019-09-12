import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from './notes-service.service'
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public notes: Array<any>;
  public currentNote: any;
  constructor(private notesService: NotesServiceService) {
    notesService.get().subscribe((data: any) => this.notes = data);
    this.currentNote = this.getDefaultNote();
  }
  private getDefaultNote() {
    return {
      id: undefined,
      title: '',
      description: ''
    }
  }

  //variable to hide or show add note component
  public isViewable: boolean;

  //class function to display note
  public createUpdateNote = function (note: any) {
    let noteWithId = _.find(this.notes, (el => el.id === note.id));
    if (noteWithId) {
      const updateIndex = _.findIndex(this.notes, { id: noteWithId.id });
      this.notesService.update(note).subscribe(
        this.notes.splice(updateIndex, 1, note)
      );
    } else {
      this.notesService.add(note).subscribe(
        noteRecord => {
          note.id = noteRecord.id;
          this.notes.push(note)
        }
      );
    }
    this.currentNote = this.getDefaultNote();
  };

  //class function to update note
  public editNote = function(record: any) {
    this.currentNote = record;
    this.isViewable = true;
  };

  //class function to default empty note
  public newNote = function () {
    this.currentNote = this.getDefaultNote();
    this.isViewable = true;
  };

  //class function to delete note
  public deleteNote(record) {
    const deleteIndex = _.findIndex(this.notes, { id: record.id });
    this.notesService.remove(record).subscribe(
      result => this.notes.splice(deleteIndex, 1)
    );
  }
  ngOnInit() {
    this.isViewable = false;
  }
}
