import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { IotService } from './iot.service';

@Component({
  templateUrl: 'iot.component.html'
})
export class IotComponent implements OnInit {

  fileReader: FileReader = new FileReader();

  public registerNewDeviceModal;

  public devices = [];
  public selectedDevice = null;

  public deviceId = '';
  public entityId = '';
  public endpoint = '';
  public protocol = '';
  public deviceSchema = '';

  constructor(public iotService: IotService) {
    this.fileReader.onload = file => {
      const contents: any = file.target;
      const result = contents.result;
      if (result) {
        this.deviceSchema = result;
      } else {
        // TODO Empty file doesn't change content
        console.log('Read empty file');
      }
    };
  }

  ngOnInit() {
    if (this.iotService.selectedService) {
      this.getDevices();
    }
  }

  bindModal(registerNewDeviceModal) {
    this.registerNewDeviceModal = registerNewDeviceModal;
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fileReader.readAsText(file);
    }
  }

  getDevices() {
    this.iotService.getDevices()
      .then(devices => {
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
