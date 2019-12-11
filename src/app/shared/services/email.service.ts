import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmailService {
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

  public sendEmail(model: any) {
debugger;
    var url = `${environment.apiUrl}/Email/SendEmail`;
    var result =this.httpClient.post(url,{
      ToAddress: model.ToAddress,
      Subject: model.Subject,
      BodyMessage: model.BodyMessage
    });
    return result;
  }
  
}
