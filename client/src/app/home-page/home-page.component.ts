import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../shared/interfaces';
import { NotesService } from '../shared/notes.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit{
  notes$: Observable<Note[]> | null = null;

  constructor(private notesService: NotesService){}

  ngOnInit(){
    this.notes$ = this.notesService.getNotes()
  }
}
