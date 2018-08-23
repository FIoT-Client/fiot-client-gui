import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Service } from '../../domain/service';
import { SettingsService } from '../../services/settings.service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {

  public settings: Settings;
  public settingsStr: string;

  public subscription: Subscription;
  public selectedService: Service;
  public selectedServiceStr: string;

  constructor(
    private settingsService: SettingsService,
    private serviceService: ServiceService
  ) { }

  ngOnInit() {
    this.settingsService.listSettings()
      .then(settings => {
        this.settings = settings;
        this.settingsStr = JSON.stringify(this.settings, null, 2);
      })
      .catch(error => {
        console.log('Error');
        // TODO Show detailed error cause
        alert(`An error occured while obtaining settings. Error: ${error}`);
      });

    this.subscription = this.serviceService.serviceObservable
      .subscribe(selectedService => {
        this.selectedService = selectedService;
        this.selectedServiceStr = JSON.stringify(this.selectedService, null, 2);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
