import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { FoldersService } from 'src/app/shared/folders.service';
import { Note, Folder } from 'src/app/shared/interfaces';
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
  note: Note| null = null;
  load = false;
  updateSub: Subscription| null = null;
  folders$: Observable<Folder[]> | null = null;

  constructor(
    private route: ActivatedRoute, 
    private notesService: NotesService,
    private foldersService: FoldersService,
    private alertService: AlertService,
    private router: Router){}

  submit(){
    if(this.form.invalid)return;
    if(!this.note)return;

    this.load = true;
    this.updateSub = this.notesService.updateNote({
      ...this.note,
      text: this.form.value.text,
      title: this.form.value.title,
      parentFolderId: this.form.value.folder
    }).subscribe(()=>{this.load = false; this.alertService.success('Note edited'); console.log(this.form.value.folder)})
  };

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params)=>{
        return this.notesService.getNoteById(params['id'])
      })
    ).subscribe(
      (note: Note)=>{
        this.note = note;
        this.form = new FormGroup({
          title: new FormControl(note.title, Validators.required),
          text: new FormControl(note.text, Validators.required),
          folder: new FormControl(note.parentFolderId, Validators.required)
    })}, 
      (error)=>{
        this.router.navigate(['/admin', 'dashboard']);
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth'})
      })

      this.folders$ = this.foldersService.getFolders()
  }

  ngOnDestroy(): void {
    if(this.updateSub)this.updateSub.unsubscribe();
  }

}
