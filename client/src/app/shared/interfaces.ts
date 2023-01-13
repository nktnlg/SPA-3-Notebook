export interface User {
    email: string,
    password: string,
    returnSecureToken?: boolean
}

export type AlertType = 'success' | 'warn' | 'danger'

export interface Alert {
    type: AlertType,
    text: string
}

export interface Folder {
    id?: string,
    title: string,
    author: string,
    date: Date,
    parentFolderId: string,
    color?: string
}

export interface Note {
    id?: string,
    title: string,
    text: string,
    author: string,
    date: Date,
    parentFolderId: string,
    parentFolderName?: string,
    color?: string
}

export interface FbAuthResponse {
    idToken: string,
    expiresIn: string
}

export interface FbCreateResponse {
    name: string
}
export interface FbGetNotesResponse {
    [key: string]: Note
}
export interface FbGetFoldersResponse {
    [key: string]: Folder
}

export interface RootFolder {
    rootTitle: string
}
