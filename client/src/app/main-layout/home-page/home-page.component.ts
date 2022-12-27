import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, } from 'rxjs';
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
  logged = false
  folderId = 'none';
  parentFolder = 'none';
  notes$: Observable<Note[]> | null = null;
  folders$: Observable<Folder[]> | null = null;
  parent$: Subscription | null = null;

  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute,
    private foldersService: FoldersService,
    private router: Router,
    private auth: AuthService){}


  goToUpperFolder(folderId: string | undefined){
    if(this.parentFolder !== 'none') {this.router.navigate(['/', this.parentFolder])}
    else {this.router.navigate(['/'])}

  }

  ngOnInit(){
    if (this.auth.token) this.logged = true;
    this.route.params.subscribe((params: Params)=>{
      if(params['folder'])this.folderId = params['folder']
      this.notes$ = this.notesService.getNotesByFolderId(this.folderId);
      this.folders$ = this.foldersService.getFoldersByFolderId(this.folderId);

      if(this.parentFolder !== 'none')this.parent$ = this.foldersService.getFolderById(this.folderId).subscribe(folder => this.parentFolder = folder.folder)
    });
  }

  ngOnDestroy(): void {
    if (this.parent$) this.parent$.unsubscribe;
  }
}
