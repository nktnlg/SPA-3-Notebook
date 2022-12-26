import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/shared/interfaces';
import { NotesService } from 'src/app/shared/notes.service';
import { AlertService } from '../../admin-shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styles: [
  ]
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  notes: Note[] = [];
  notesSub: Subscription|undefined;
  searchNotes = '';
  deleteSub: Subscription|undefined;

  constructor(
    private notesService: NotesService,
    private alertService: AlertService,
    private router: Router){}


  goToNoteEdit(id: string | undefined){
      if (id) {this.router.navigate(['/admin', 'note',  id, 'edit']);}
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' });
  };

  remove(id: string | undefined){
    if (!id)return;
    this.deleteSub = this.notesService.deleteNote(id).subscribe(()=>{
      this.notes = this.notes.filter(note => note.id !== id)
      this.alertService.danger('Note deleted')
    })
  }

  ngOnInit(): void {
    this.notesSub = this.notesService.getNotes().subscribe(notes => {
      this.notes = notes
    })
  }
  ngOnDestroy(): void {
    if(this.notesSub) this.notesSub.unsubscribe;
    if(this.deleteSub) this.deleteSub.unsubscribe;
  }

}
