import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FoldersService } from 'src/app/shared/folders.service';
import { Folder, Note } from 'src/app/shared/interfaces';
import { NotesService } from 'src/app/shared/notes.service';
import { AlertService } from '../../admin-shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styles: [
  ]
})
export class CreatePageComponent implements OnInit{
  form!: FormGroup;
  formFolder!: FormGroup;
  constructor(
    private notesService: NotesService,
    private alertService: AlertService,
    private foldersService: FoldersService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required])
    })

    this.formFolder = new FormGroup({
      titleFolder: new FormControl(null, [Validators.required]),
      authorFolder: new FormControl(null, [Validators.required])
    })
  }

  submit(){
    if (this.form.invalid) return;
    const note: Note = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
      folder: '-NKF1dhDk544lM7s31kJ'
    } 

    this.notesService.create(note).subscribe(()=>{
      this.alertService.success('Note created')
      this.form.reset()
    })
  }

  submitFolder(){
    if (this.formFolder.invalid) return;
    const folder: Folder = {
      title: this.formFolder.value.titleFolder,
      author: this.formFolder.value.authorFolder,
      date: new Date(),
      folder: '-NKF1dhDk544lM7s31kJ'
    } 
    console.log(folder)
    this.foldersService.create(folder).subscribe(()=>{
      this.alertService.success('Folder created')
      this.formFolder.reset()
    })
  }

  
  

}
