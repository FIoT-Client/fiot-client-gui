import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Service } from '../../domain/service';


@Injectable()
export class ServiceService {

  private baseUrl = 'http://localhost:8000/services';

  private serviceSubject = new BehaviorSubject<Service>(null);
  serviceObservable: Observable<Service> = this.serviceSubject.asObservable();

  constructor(private http: Http) { }

  public selectService(service: Service) {
    this.serviceSubject.next(service);
  }

  public listServices() {
    return this.http.get(`${this.baseUrl}`)
      .toPromise()
      .then(data => data.json())
      .then(data => data['response'])
      .catch(() => []);
  }

}
