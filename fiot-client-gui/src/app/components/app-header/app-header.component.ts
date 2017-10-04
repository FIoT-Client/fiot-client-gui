import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../views/service/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeader implements OnInit {

  // public disabled = false;
  // public status: {isopen: boolean} = {isopen: false};
  //
  // public toggled(open: boolean): void {
  //   console.log('Dropdown is now: ', open);
  // }
  //
  // public toggleDropdown($event: MouseEvent): void {
  //   $event.preventDefault();
  //   $event.stopPropagation();
  //   this.status.isopen = !this.status.isopen;
  // }

  constructor(public serviceService: ServiceService) { }

  ngOnInit(): void {
    console.log(this.serviceService.selectedService);
  }
}
