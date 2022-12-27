import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Note } from '../../shared/interfaces';
import { NotesService } from '../../shared/notes.service';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styles: [
  ]
})
export class NotePageComponent implements OnInit{
  note: Note | null = null;

  constructor(
    private route: ActivatedRoute, 
    private notesService: NotesService,
    private router: Router){}

  goToMain(){
    this.router.navigate(['/']);
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth'})
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params)=>{
        return this.notesService.getNoteById(params['id'])
      })
    ).subscribe((note: Note)=>{
        this.note = note;
      })
  }
}
