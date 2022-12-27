import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Folder } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styles: []
})
export class FolderComponent {
  @Input()
  folder!: Folder;
  
  constructor(
    private router: Router,
    ){}

  goToFolder(folderId: string | undefined){
    if (folderId) this.router.navigate(['/', folderId])
  }

}
