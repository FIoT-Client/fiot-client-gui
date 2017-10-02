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

  public deviceId = '';
  public entityId = '';
  public endpoint = '';
  public protocol = '';
  public deviceSchema = '';

  constructor(private iotService: IotService) { }

  ngOnInit(): void {
    this.getDevices();
  }

  bindModal(registerNewDeviceModal) {
    this.registerNewDeviceModal = registerNewDeviceModal;
  }

  getDevices() {
    this.iotService.getDevices()
      .then(devices => {
        console.log(devices);
        this.devices = devices;
      });
  }

  selectDevice(device) {
    this.selectedDevice = device;
  }

  registerDevice() {
    this.iotService.registerDevice(this.deviceId, this.entityId, this.endpoint, this.protocol, this.deviceSchema)
      .then(data => {
        if (data['status_code'] === 201) {
          console.log('Success');
          this.registerNewDeviceModal.hide();
          this.getDevices();
        } else {
          console.log('Error');
          // TODO Show detailed error cause
          alert(`Ocorreu um erro ao registrar o dispositivo. Código: ${data['status_code']}`);
        }
      });
  }

}
