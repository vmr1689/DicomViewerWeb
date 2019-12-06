import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PatientsService {
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

    getAllPatients() {
        return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetAllPatientsFromOrthanc`, this.httpOptions);
    }

    getAllStudies() {
        return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetAllStudiesFromOrthanc`, this.httpOptions);
    }

    getStudies(patientId:any) {
      debugger;
      return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetStudiesFromOrthanc/`+ patientId, this.httpOptions);
  }
}