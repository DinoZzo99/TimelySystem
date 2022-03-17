import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  @Input() EditProject?: any;
  @Input() timeLog?: any;
  public projectName?: string;

  constructor(public modalService: NgbModal) { }


  onSubmit(name: string, startDate: string, endDate: string) {
    this.EditProject(this.timeLog.id, name, startDate, endDate);
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
