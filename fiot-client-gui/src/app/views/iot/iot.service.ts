import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IotService {

  private baseUrl = 'http://localhost:8000/devices';
  private serviceName = 'StelaService';
  private servicePath = '/stela';
  private apiKey = '246d9fa2a1a111e7844360f81db4b630';

  constructor(private http: Http) { }

  public getDevices(): Promise<any> {
    return this.http.get(`${this.baseUrl}/?service_name=${this.serviceName}&service_path=${this.servicePath}&api_key=${this.apiKey}`)
      .toPromise()
      .then(data => data.json())
      .then(data => data['response'])
      .then(data => data['devices'])
      .catch(() => []);
  }

}