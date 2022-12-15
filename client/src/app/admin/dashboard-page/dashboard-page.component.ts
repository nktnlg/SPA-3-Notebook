import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/shared/interfaces';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styles: [
  ]
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  notes: Note[] = [];
  notesSub: Subscription|undefined;

  constructor(private notesService: NotesService){}

  ngOnInit(): void {
    this.notesSub = this.notesService.getNotes().subscribe(notes => {
      this.notes = notes
    })
  }
  ngOnDestroy(): void {
    if(this.notesSub) this.notesSub.unsubscribe;
  }

}
