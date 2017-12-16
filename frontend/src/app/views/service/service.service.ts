import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Service } from '../../domain/service';
import { environment } from '../../../environments/environment';


@Injectable()
export class ServiceService {

  private baseUrl = `${environment.serverRoot}/services`;

  private serviceSubject = new BehaviorSubject<Service>(null);
  serviceObservable: Observable<Service> = this.serviceSubject.asObservable();

  constructor(private http: Http) { }

  public selectService(service: Service) {
    this.serviceSubject.next(service);
  }

  public createService(service: Service) {
    const body = service.toServerJSON();
    return this.http.post(`${this.baseUrl}/`, body)
      .toPromise()
      .then(data => data.json())
      .catch(() => {
        return {'status_code': 500};
      });
  }

  public listServices() {
    return this.http.get(`${this.baseUrl}/`)
      .toPromise()
      .then(data => data.json())
      .then(data => data['response'])
      .catch(() => []);
  }

}
