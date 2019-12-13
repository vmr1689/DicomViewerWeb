import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SegmentsService {
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


    public getSegmentedFiles(instanceId: any) {
        debugger;
        return this.httpClient.get<any>(`${environment.apiUrl}/Notes/GetByInstanceId/` + instanceId, this.httpOptions);
    }

}
