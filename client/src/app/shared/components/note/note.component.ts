import { Component, Input } from '@angular/core';
import { Note } from '../../interfaces';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styles: [
  ]
})
export class NoteComponent {
  @Input()
  note!: Note;

  constructor(){}

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
