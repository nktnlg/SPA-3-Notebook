import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { FbCreateResponse, FbGetFoldersResponse, Folder, RootFolder } from "./interfaces";

@Injectable({providedIn: 'root'})
export class FoldersService{
    constructor(private http: HttpClient){}

    create(folder: Folder): Observable<Folder> {
        return this.http.post<FbCreateResponse>(`${environment.fbDBUrl}/folders.json`, folder)
        .pipe(
            map((res: FbCreateResponse)=>{
                return { 
                    ...folder,
                    id: res.name,
                    date: new Date(folder.date)
                }
            })
        )
    }

    getFolders(): Observable<Folder[]>{
        return this.http.get<FbGetFoldersResponse>(`${environment.fbDBUrl}/folders.json`)
        .pipe(
            map((res: FbGetFoldersResponse)=>{
                return Object.keys(res).map(key=>({
                    ...res[key],
                    id: key,
                    date: new Date(res[key].date)
                }))
            })
        )
    }

    getFolderById(id: string): Observable<Folder>{
        return this.http.get<Folder>(`${environment.fbDBUrl}/folders/${id}.json`).pipe(
            map((res: Folder)=>{
                return {...res, id, date: new Date(res.date)}
            })
        )
    };

    getFoldersByFolderId(folderId: string): Observable<Folder[]>{
        return this.http.get<FbGetFoldersResponse>(`${environment.fbDBUrl}/folders.json`)
        .pipe(
            map((res: FbGetFoldersResponse)=>{
                return Object.keys(res).filter(key=> res[key].parentFolderId === folderId).map(key=> ({
                    ...res[key],
                    id: key,
                    date: new Date(res[key].date)
                }))
            })
        )
    }

    getRootFolderName(): Observable<RootFolder>{
        return this.http.get<RootFolder>(`${environment.fbDBUrl}/root/-NLIpPLKAIVoLDeNbTuO.json`)
    }

    setRootFolderName(newName: string): Observable<RootFolder>{
        return this.http.patch<RootFolder>(`${environment.fbDBUrl}/root/-NLIpPLKAIVoLDeNbTuO.json`, {rootTitle: newName})
    }
}