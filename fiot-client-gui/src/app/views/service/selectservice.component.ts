import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-selectservice',
  templateUrl: './selectservice.component.html'
})
export class SelectServiceComponent implements OnInit {

  public services;
  public selectedService = null;

  constructor(public serviceService: ServiceService) { }

  ngOnInit() {
    this.serviceService.listServices()
      .then(serviceList => {
        this.services = serviceList;
        console.log(this.services);
      });
  }

  selectService() {
    if (this.selectedService != null) {
      console.log('Old: ', this.serviceService.selectedService);
      this.serviceService.selectService(this.selectedService.serviceName, this.selectedService.servicePath);
    } else {
      // TODO Show message that service is mandatory
    }
  }

}
