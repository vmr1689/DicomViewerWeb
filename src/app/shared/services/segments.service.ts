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


    public getTHSegmentedFiles(instanceId: any) {
        debugger;
        return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetTHSegmentsByInstanceId/` + instanceId, this.httpOptions);
    }

    public getKMSegmentedFiles(instanceId: any) {
        debugger;
        return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetKMSegmentsByInstanceId/` + instanceId, this.httpOptions);
    }

    public getRGSegmentedFiles(instanceId: any) {
        debugger;
        return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetRGSegmentsByInstanceId/` + instanceId, this.httpOptions);
    }

    public segmentFiles(model: any) {
        
        debugger;
        var url = `${environment.apiUrl}/Segments`;
        var result = this.httpClient.post(url, {
            InstanceId: model.InstanceId,
            Segment: model.Segment,
            IsThreshold: model.IsThreshold,
            IsKMeans: model.IsKMeans,
            IsRegionGrowth: model.IsRegionGrowth
        });
        return result;
    }


}
