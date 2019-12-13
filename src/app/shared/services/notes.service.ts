import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotesService {
    headers: HttpHeaders;
    httpOptions: {};

    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': '*',
        });

        this.httpOptions = {
            headers: this.headers,
        };
    }

    public addNotes(model: any) {
        debugger;
        var url = `${environment.apiUrl}/Notes`;
        var result = this.httpClient.post(url, {
            InstanceId: model.InstanceId,
            NotesSummary: model.NotesSummary
        });
        return result;
    }

    public getNotesByInstanceId(instanceId: any) {
        debugger;
        return this.httpClient.get<any>(`${environment.apiUrl}/Notes/GetByInstanceId/` + instanceId, this.httpOptions);
    }

    public deleteNotesByNoteId(noteId: any) {
        debugger;
        return this.httpClient.delete<any>(`${environment.apiUrl}/Notes/` + noteId, this.httpOptions);
    }


}
