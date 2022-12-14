import { Pipe, PipeTransform } from "@angular/core";
import { Note } from "src/app/shared/interfaces";

@Pipe({
    name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {
    transform(notes: Note[], search=''): Note[] {
        if (!search.trim()) return notes;
        return notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()))
    }
}