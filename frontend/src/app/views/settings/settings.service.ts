import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';


@Injectable()
export class SettingsService {

  private baseUrl = `${environment.serverRoot}/settings`;

  constructor(private http: Http) { }

  public listSettings() {
    return this.http.get(`${this.baseUrl}/`)
      .toPromise()
      .then(data => data.json())
      .then(data => data['response'])
      .catch(() => []);
  }

}
