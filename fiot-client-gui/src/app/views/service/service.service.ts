import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServiceService {

  private baseUrl = 'http://localhost:8000/services';

  public selectedService = null;
  // public selectedService = {
  //   'serviceName': 'StelaService',
  //   'servicePath': '/ufrn/imd/stela'
  // };

  constructor(private http: Http) { }

  public selectService(serviceName: string, servicePath: string) {
    this.selectedService = {
      'serviceName': serviceName,
      'servicePath': servicePath
    };
    console.log('New: ', this.selectedService);
  }

  public listServices() {
    return this.http.get(`${this.baseUrl}`)
      .toPromise()
      .then(data => data.json())
      .then(data => data['response'])
      .catch(() => []);
  }

}
