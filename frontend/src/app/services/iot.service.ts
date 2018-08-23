import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { ServiceService } from './service.service';
import { Service } from '../domain/service';
import { environment } from '../../environments/environment';


@Injectable()
export class IotService {

  private baseUrl = `${environment.serverRoot}/devices`;

  selectedService: Service;
  subscription: Subscription;

  constructor(private http: Http, private serviceService: ServiceService) {
    this.serviceService.serviceObservable
        .subscribe(selectedService => {
          this.selectedService = selectedService;
        });
  }

  public getDevices(): Promise<any> {
    return this.http.get(`${this.baseUrl}/?service_name=${this.selectedService.serviceName}`
                         + `&service_path=${this.selectedService.servicePath}`
                         + `&api_key=${this.selectedService.apiKey}`)
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

    return this.http.post(`${this.baseUrl}/?service_name=${this.selectedService.serviceName}`
                          + `&service_path=${this.selectedService.servicePath}`
                          + `&api_key=${this.selectedService.apiKey}`, body)
      .toPromise()
      .then(data => data.json())
      .catch(() => {
        return {'status_code': 500};
      });
  }

}
