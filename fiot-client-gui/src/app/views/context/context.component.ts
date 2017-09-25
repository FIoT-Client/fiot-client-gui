import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ContextService } from './context.service';

@Component({
  templateUrl: 'context.component.html'
})
export class ContextComponent implements OnInit {

  public createNewEntityModal;

  public entities = [];
  public selectedEntity = null;

  constructor(private contextService: ContextService) { }

  ngOnInit(): void {
    this.contextService.getEntities()
      .then(entities => {
        console.log(entities);
        this.entities = entities;
      });
  }

  selectEntity(entity) {
    this.selectedEntity = entity;
  }

}
