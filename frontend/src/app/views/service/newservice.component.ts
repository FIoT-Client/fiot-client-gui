import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../domain/service';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-newservice',
  templateUrl: './newservice.component.html'
})
export class NewServiceComponent implements OnInit {

  public service: Service;

  constructor(private router: Router, private serviceService: ServiceService) {
    this.service = new Service();
  }

  ngOnInit() { }

  createService() {
    this.serviceService.createService(this.service)
      .then(data => {
        if (data['status_code'] === 201) {
          console.log('Success');
          this.serviceService.selectService(this.service);
          this.router.navigate(['/dashboard']);

        } else if (data['status_code'] === 409) {
          console.log('Duplicated service');
          alert('There is already a registered service with the values provided. Change them and try again.');

        } else {
          console.log('Error');
          // TODO Show detailed error cause
          alert(`An error occured while creating the service. Code: ${data['status_code']}`);
        }
      });
  }

}
