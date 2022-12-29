import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/admin/admin-shared/services/auth.service';
import { Note } from '../../shared/interfaces';
import { NotesService } from '../../shared/notes.service';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styles: [
  ]
})
export class NotePageComponent implements OnInit{
  logged = false;
  note: Note | null = null;

  constructor(
    private route: ActivatedRoute, 
    private notesService: NotesService,
    private router: Router,
    private auth: AuthService){}

  goBack(){
    if(this.note?.folder !== 'none') {this.router.navigate(['/', this.note?.folder])}
    else {this.router.navigate(['/'])}
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth'})
  }

  goToEdit(){
    this.router.navigate(['/admin', 'note', this.note?.id, 'edit'])
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth'})
  }

  ngOnInit(): void {
    if (this.auth.token) this.logged = true;

    this.route.params.pipe(
      switchMap((params: Params)=>{
        return this.notesService.getNoteById(params['id'])
      })
    ).subscribe((note: Note)=>{
        this.note = note;
      })
  }
}
