import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IotService {

  private baseUrl = 'http://localhost:8000/devices';
  private serviceName = 'STELAService';
  private servicePath = '/stela';
  private apiKey = '7e7ccd86a71811e7be9360f81db4b630';

  constructor(private http: Http) { }

  public getDevices(): Promise<any> {
    return this.http.get(`${this.baseUrl}/?service_name=${this.serviceName}&service_path=${this.servicePath}&api_key=${this.apiKey}`)
      .toPromise()
      .then(data => data.json())
      .then(data => data['response'])
      .then(data => data['devices'])
      .catch(() => []);
  }

  public registerDevice(deviceId: string, entityId: string, endpoint: string, protocol: string, deviceSchema: string) {
    const body = {
      'device_id': deviceId,
      'entity_id': entityId,
      'endpoint': endpoint,
      'protocol': protocol,
      'device_schema': deviceSchema
    };

    return this.http.post(`${this.baseUrl}/?service_name=${this.serviceName}&service_path=${this.servicePath}&api_key=${this.apiKey}`, body)
      .toPromise()
      .then(data => data.json())
      .catch(() => {
        return {'status_code': 500};
      });
  }

}
