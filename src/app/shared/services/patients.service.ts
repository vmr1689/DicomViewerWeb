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
    return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetAllPatients`, this.httpOptions);
  }

  getAllStudies() {
    return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetAllStudies`, this.httpOptions);
  }

  getStudies(patientId: any) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetPatientStudies/` + patientId, this.httpOptions);
  }

  getAllSeries() {
    return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetAllSeries`, this.httpOptions);
  }

  getSeries(seriesId: any) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetSeriesById/` + seriesId, this.httpOptions);
  }

  GetImageSeriesByPatientId(patientId: any) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetImageSeriesByPatientId/` + patientId, this.httpOptions);
  }

  GetImageSeriesByStudyId(studyId: any) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetImageSeriesByStudyId/` + studyId, this.httpOptions);
  }

  GetImageStudyByStudyId(studyId: any) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetImageStudyByStudyId/` + studyId, this.httpOptions);
  }

  GetInstanceById(instanceId: any) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetInstanceById/` + instanceId, this.httpOptions);
  }

  GetInstancePreviewById(instanceId: any) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetInstanceById1/` + instanceId, this.httpOptions);
  }

  GetDicomTagsById(instanceId: any) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Dicom/GetDicomTagsById/` + instanceId, this.httpOptions);
  }
}
