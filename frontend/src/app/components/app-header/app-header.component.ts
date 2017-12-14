import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ServiceService } from '../../views/service/service.service';
import { Service } from '../../domain/service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeader implements OnInit, OnDestroy {

  selectedService: Service;
  subscription: Subscription;

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.subscription = this.serviceService.serviceObservable
                            .subscribe(selectedService => this.selectedService = selectedService);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
