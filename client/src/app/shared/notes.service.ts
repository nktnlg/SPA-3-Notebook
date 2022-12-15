import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {map} from "rxjs/operators"
import { environment } from "src/environment/environment";
import { FbCreateResponse, FbGetNotesResponse, Note } from "./interfaces";

@Injectable({providedIn: 'root'})
export class NotesService {
    constructor(private http: HttpClient) {}

    create(note: Note): Observable<Note> {
        return this.http.post<FbCreateResponse>(`${environment.fbDBUrl}/notes.json`, note)
        .pipe(
            map((res: FbCreateResponse)=>{
                return { 
                    ...note,
                    id: res.name,
                    date: new Date(note.date)
                }
            })
        )
    }

    getNotes(): Observable<Note[]>{
        return this.http.get<FbGetNotesResponse>(`${environment.fbDBUrl}/notes.json`)
        .pipe(
            //вчитайся
            map((res: FbGetNotesResponse)=>{
                return Object.keys(res).map(key=>({
                    ...res[key],
                    id: key,
                    date: new Date(res[key].date)
                }))
            })
        )
    }

}