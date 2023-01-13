import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, switchMap, } from 'rxjs';
import { AuthService } from 'src/app/admin/admin-shared/services/auth.service';
import { FoldersService } from 'src/app/shared/folders.service';
import { Folder, Note } from '../../shared/interfaces';
import { NotesService } from '../../shared/notes.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute,
    private foldersService: FoldersService,
    private router: Router,
    private auth: AuthService){}

  logged = false;

  rootNameForm!: FormGroup;
  editRoot = false;
  editRootName(bool: boolean){this.editRoot = bool}
  rootName$: Subscription | null = null;
  rootName = '';
  setNewRootName(){
    this.foldersService.setRootFolderName(this.rootNameForm.value.title).subscribe((res)=>{
      this.rootNameForm.reset();
      this.editRootName(false);
      this.rootName = res.rootTitle;
    })
    
  }
  

  folderMinimize = '-';
  folderMinimizeSwitch(){if(this.folderMinimize === '-'){this.folderMinimize = '+'}else{this.folderMinimize = '-'}};
  noteMinimize = '-';
  noteMinimizeSwitch(){if(this.noteMinimize === '-'){this.noteMinimize = '+'}else{this.noteMinimize = '-'}};

  folderId = 'none';
  folderName = 'none';
  parentFolderId = 'none';
  parentFolderName = 'none';

  notes$: Observable<Note[]> | null = null;
  folders$: Observable<Folder[]> | null = null;
  parent$: Subscription | null = null;
  pSub: Subscription | null = null;

  

  goToCreateFolder(){
    this.router.navigate(['/admin', 'create'], {queryParams:{parentFolderId: this.folderId, typeOfNew: 'folder'}})

    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth'})
  };
  goToCreateNote(){
    this.router.navigate(['/admin', 'create'], {queryParams:{parentFolderId: this.folderId, typeOfNew: 'note'}})
    
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth'})
  };


  goToUpperFolder(folderId: string | undefined){
    if(this.parentFolderId !== 'none') {this.router.navigate(['/', this.parentFolderId])}
    else {this.router.navigate(['/'])}

    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth'})

  }

  ngOnInit(){

    this.rootName$ = this.foldersService.getRootFolderName().subscribe( a => {this.rootName = a.rootTitle})

    this.rootNameForm = new FormGroup({
      title: new FormControl(null, [Validators.required])
    })

    if (this.auth.token) this.logged = true;
    this.route.params.subscribe((params: Params)=>{
      if(params['folder'])this.folderId = params['folder']
      this.notes$ = this.notesService.getNotesByFolderId(this.folderId);
      this.folders$ = this.foldersService.getFoldersByFolderId(this.folderId);

      if(this.folderId !== 'none')this.parent$ = this.foldersService
      .getFolderById(this.folderId)
      .subscribe(
        folder => {
          this.parentFolderId = folder.parentFolderId; 
          if(folder.parentFolderId !== 'none'){
            this.pSub = this.foldersService.getFolderById(folder.parentFolderId).subscribe(
              folder => this.parentFolderName = folder.title,
              error => {console.error(error)})
            }else{this.parentFolderName = this.rootName}

          this.folderName = folder.title;
        },
        error => {console.error(error)},
        () => {}
      )}
    );
  }

  ngOnDestroy(): void {
    if (this.parent$) this.parent$.unsubscribe();
    if (this.rootName$) this.rootName$.unsubscribe();
    if (this.pSub) this.pSub.unsubscribe();
  }
}
