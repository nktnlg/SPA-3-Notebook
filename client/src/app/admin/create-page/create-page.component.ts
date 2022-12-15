import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/shared/interfaces';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styles: [
  ]
})
export class CreatePageComponent implements OnInit{
  form!: FormGroup;
  constructor(private notesService: NotesService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required])
    })
  }

  submit(){
    if (this.form.invalid) return;
    const note: Note = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    } 
    this.notesService.create(note).subscribe(()=>{
      this.form.reset()
    })
  }

  
  

}
