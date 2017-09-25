import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { IotService } from './iot.service';

@Component({
  templateUrl: 'iot.component.html'
})
export class IotComponent implements OnInit {

  public registerNewDeviceModal;

  public devices = [];
  public selectedDevice = null;

  constructor(private iotService: IotService) { }

  ngOnInit(): void {
    this.iotService.getDevices()
      .then(devices => {
        console.log(devices);
        this.devices = devices;
      });
  }

  selectDevice(device) {
    this.selectedDevice = device;
  }

}
