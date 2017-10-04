import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-selectservice',
  templateUrl: './selectservice.component.html',
  styleUrls: ['./selectservice.component.css']
})
export class SelectServiceComponent implements OnInit {

  public services = [
    {'serviceName': 'UFRNService', 'servicePath': '/ufrn'},
    {'serviceName': 'DIMAPService', 'servicePath': '/ufrn/dimap'},
    {'serviceName': 'IMDService', 'servicePath': '/ufrn/imd'},
    {'serviceName': 'StelaService', 'servicePath': '/ufrn/imd/stela'}
  ];

  public selectedService;

  constructor(public serviceService: ServiceService) { }

  ngOnInit() {
  }

  selectService() {
    console.log(this.selectedService);
  }

}
