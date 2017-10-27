import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';
import { Service } from '../../domain/service';

@Component({
  selector: 'app-selectservice',
  templateUrl: './selectservice.component.html'
})
export class SelectServiceComponent implements OnInit {

  public services: Service[];
  public selectedService = null;

  constructor(private router: Router, private serviceService: ServiceService) { }

  ngOnInit() {
    this.serviceService.listServices()
      .then(serviceList => {
        this.services = serviceList;
        console.log(this.services);
      });
  }

  selectService() {
    if (this.selectedService != null) {
      this.serviceService.selectService(this.selectedService);
      this.router.navigate(['/dashboard']);
    } else {
      // TODO Show message that service is mandatory
      console.log('selectedService is null');
    }
  }

}
