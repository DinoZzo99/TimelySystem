import { Component, Input } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-timer-pop-up',
  templateUrl: './timer-pop-up.component.html',
  styleUrls: ['./timer-pop-up.component.css']
})

export class TimerPopUpComponent {
  @Input() EndTimer?: any;

  constructor(public modalService: NgbModal) { }

  
  onSubmit(name: string) {
    if (this.EndTimer) {
      this.EndTimer(name);
    }
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
