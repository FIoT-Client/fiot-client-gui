import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'iot.component.html'
})
export class IotComponent implements OnInit {

  entities = [ {'id': 'LDR001'}, {'id': 'LDR002'}, {'id': 'LDR003'} ];
  selectedEntity = null;

  constructor( ) { }

  ngOnInit(): void { }

  selectEntity(entity) {
    this.selectedEntity = entity;
  }

}
