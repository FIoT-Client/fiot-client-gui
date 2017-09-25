import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  templateUrl: 'context.component.html'
})
export class ContextComponent implements OnInit {

  entities = [ {'id': 'LDR001'}, {'id': 'LDR002'}, {'id': 'LDR003'} ];
  selectedEntity = null;

  public largeModal;

  constructor( ) { }

  ngOnInit(): void { }

  selectEntity(entity) {
    this.selectedEntity = entity;
  }

}
