import { Injectable } from '@angular/core';

@Injectable()
export class ServiceService {

  public selectedService = {};

  constructor() { }

  public selectService(serviceName: string, servicePath: string) {
    this.selectedService = {
      'serviceName': serviceName,
      'servicePath': servicePath
    };
  }

  public listServices() {

  }

}
