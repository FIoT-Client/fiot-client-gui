import { Component, OnInit, OnDestroy } from '@angular/core';
import { navItems } from './../../_nav';
import { Subscription } from 'rxjs/Subscription';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../domain/service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  
  selectedService: Service;
  subscription: Subscription;
  
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  
  constructor(private serviceService: ServiceService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }
  
  ngOnInit() {
    this.subscription = this.serviceService.serviceObservable
                            .subscribe(selectedService => this.selectedService = selectedService);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

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

}
