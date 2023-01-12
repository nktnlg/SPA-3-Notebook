import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  constructor(
    private notesService: NotesService,
    private alertService: AlertService,
    private foldersService: FoldersService,
    private router: Router,
    private route: ActivatedRoute){}

  noteForm!: FormGroup;
  folderForm!: FormGroup;

  parentFolderId = 'none';
  folders$: Observable<Folder[]> | null = null;
  
  newFolder = true;
  newNote = false;

  switchToNewFolder(){this.newFolder = true; this.newNote = false;}
  switchToNewNote(){this.newFolder = false; this.newNote = true;}
  setUsernameFolderAuthor(){let username = localStorage.getItem('username'); if (username) this.folderForm.controls['folderAuthor'].setValue(username)}
  setUsernameNoteAuthor(){let username = localStorage.getItem('username'); if (username) this.noteForm.controls['noteAuthor'].setValue(username)}

  submitNote(){
    if (this.noteForm.invalid) return;
    const note: Note = {
      title: this.noteForm.value.noteTitle,
      text: this.noteForm.value.noteText,
      author: this.noteForm.value.noteAuthor,
      date: new Date(),
      parentFolderId: this.noteForm.value.noteParent,
    }

    this.notesService.create(note).subscribe(()=>{
      this.alertService.success('Note created')
      this.noteForm.reset({noteParent: this.noteForm.value.noteParent})
    })
  }
  submitFolder(){
    if (this.folderForm.invalid) return;
    const folder: Folder = {
      title: this.folderForm.value.folderTitle,
      author: this.folderForm.value.folderAuthor,
      date: new Date(),
      parentFolderId: this.folderForm.value.folderParent
    }
    
    this.foldersService.create(folder).subscribe(()=>{
      this.alertService.success('Folder created')
      this.folderForm.reset({folderParent: this.folderForm.value.folderParent})
    })
  }
  goToDashboard(){
    this.router.navigate(['/admin', 'dashboard']);
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth'})
  }

  ngOnInit(): void {
    //Params reading
    this.route.queryParams.subscribe((params: Params)=> {
      if(params['parentFolderId'])this.parentFolderId = params['parentFolderId'];
      if(params['typeOfNew']){params['typeOfNew'] === 'note' ? this.switchToNewNote() : this.switchToNewFolder()}
      
    })

    //get all folders
    this.folders$ = this.foldersService.getFolders()

    //Folder form
    this.folderForm = new FormGroup({
      folderParent: new FormControl(this.parentFolderId, [Validators.required]),
      folderTitle: new FormControl(null, [Validators.required]),
      folderAuthor: new FormControl(null, [Validators.required])
    })

    //Note form
    this.noteForm = new FormGroup({
      noteParent: new FormControl(this.parentFolderId, [Validators.required]),
      noteTitle: new FormControl(null, [Validators.required]),
      noteText: new FormControl(null, [Validators.required]),
      noteAuthor: new FormControl(null, [Validators.required])
    })

    this.folderForm.controls['folderParent'].setValue(this.parentFolderId)
    this.noteForm.controls['noteParent'].setValue(this.parentFolderId)
  }
}
