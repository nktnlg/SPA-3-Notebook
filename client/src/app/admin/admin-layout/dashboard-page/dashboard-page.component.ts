import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';
import { FoldersService } from 'src/app/shared/folders.service';
import { Folder, Note } from 'src/app/shared/interfaces';
import { NotesService } from 'src/app/shared/notes.service';
import { AlertService } from '../../admin-shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styles: [
  ]
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  modal: string | null = '';
  switchModal(noteId: string| undefined){if(noteId){this.modal = noteId}else{this.modal = null}}
  notes: Note[] = [];
  itemsLimit = 5;
  notesSub: Subscription|undefined;
  deleteSub: Subscription|undefined;
  searchNotes = '';

  constructor(
    private notesService: NotesService,
    private foldersService: FoldersService,
    private alertService: AlertService,
    private router: Router){}

  showMore(){
    this.itemsLimit += 5
    this.notesSub = this.notesService.getNotesPagination(this.itemsLimit).subscribe(notes => {
      this.notes = notes.map(localNote => {
        let note: Note = localNote
        const sub = this.foldersService.getFolderById(localNote.parentFolderId)
        .subscribe(folder => note.parentFolderName = folder.title)
        return note
      })
    })
  }


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
      this.notes = this.notes.filter(note => note.id !== id);
      this.modal = null;
      this.alertService.danger('Note deleted');
    })
  }

  ngOnInit(): void {
    this.notesSub = this.notesService.getNotesPagination(this.itemsLimit).subscribe(notes => {
      this.notes = notes.map(localNote => {
        let note: Note = localNote
        const sub = this.foldersService.getFolderById(localNote.parentFolderId)
        .subscribe(folder => note.parentFolderName = folder.title)
        return note
      })
    })
  }
  ngOnDestroy(): void {
    if(this.notesSub) this.notesSub.unsubscribe();
    if(this.deleteSub) this.deleteSub.unsubscribe();
  }

}
