import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Note } from 'src/app/shared/interfaces';
import { NotesService } from 'src/app/shared/notes.service';
import { AlertService } from '../../admin-shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styles: [
  ]
})
export class EditPageComponent implements OnInit, OnDestroy{

  form!: FormGroup;
  note!: Note;
  load = false;
  updateSub: Subscription| null = null;

  constructor(
    private route: ActivatedRoute, 
    private notesService: NotesService,
    private alertService: AlertService){}

  submit(){
    if(this.form.invalid)return;
    this.load = true;

    this.updateSub = this.notesService.updateNote({
      ...this.note,
      text: this.form.value.text,
      title: this.form.value.title,
      folder: 'none'
    }).subscribe(()=>{this.load = false; this.alertService.success('Note edited')})
  };

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params)=>{
        return this.notesService.getNoteById(params['id'])
      })
    ).subscribe((note: Note)=>{
        this.note = note;
        this.form = new FormGroup({
          title: new FormControl(note.title, Validators.required),
          text: new FormControl(note.text, Validators.required)
    })
      })
  }

  ngOnDestroy(): void {
    if(this.updateSub)this.updateSub.unsubscribe();
  }

}
