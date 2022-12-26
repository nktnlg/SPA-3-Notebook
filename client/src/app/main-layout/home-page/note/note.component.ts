import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../../../shared/interfaces';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styles: [
  ]
})
export class NoteComponent {
  @Input()
  note!: Note;

  constructor( private router: Router){}

  goToNote(id: string | undefined){
    if (id) {this.router.navigate(['/note', id]);}
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' });
  };

  ngOnInit(): void {
    let lines = this.note.text.split('</p>')
    if (lines.length > 4){
      lines.splice(4)
      lines.splice(4, 0, '<p>...')
      this.note.text = lines.join('</p>')
    }
    this.note.text = lines.join('</p>')
  }

}
