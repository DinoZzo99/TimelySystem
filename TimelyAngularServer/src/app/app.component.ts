import { Component } from '@angular/core';
import { TimeLogService } from './app.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public timeLogs?: TimeLog[];
  public newTimeLog?: TimeLog;
  public startTime?: Date;
  public endTime?: Date;
  public timePassed?: number;
  public projectName?: string;
  public projectId?: number;
  page = 1;
  fileName = 'ExcelSheet.xlsx';

  constructor(public timeLogService: TimeLogService) { }

  public async ngOnInit(): Promise<void> { // get list from server
    this.timeLogService.deleteEmpty().subscribe(result => {
      console.log(result);
      this.initProjectAdded();
    })
  }

  public initProjectAdded() { // call this to update list
    this.timeLogService.getAll().subscribe(result => {
      this.timeLogs = result;
    }, error => console.log(error));
  }
  public writeTimes() { // tests
    console.log(this.startTime);
    console.log(this.endTime);
  }

  public cleanUp = (): void => { // reset all values
    this.newTimeLog = undefined;
    this.startTime = undefined;
    this.endTime = undefined;
    this.timePassed = undefined;
    this.projectName = undefined;
    this.projectId = undefined;
  }

  public roundUp = (value: number): number => { // round duration to .2
    let returnValue = Math.round(value * 100) / 100;
    return returnValue;
  }

  public DeleteProject = (id?: number): void => { // delete function
    if(id) this.timeLogService.delete(id).subscribe(result => {
      console.log(result);
      this.initProjectAdded();
    }, error => console.log(error));
  }

  public EditProject = (id: number, name: string, startDate: string, endDate: string): void => { // edit function
    let newStartDate = new Date(startDate);
    let newEndDate = new Date(endDate);
    let newDuration = newEndDate.valueOf() - newStartDate.valueOf();
    this.newTimeLog = {
      id: id,
      projectName: name,
      startDate: startDate,
      endDate: endDate,
      duration: newDuration
    }
    this.timeLogService.update(this.newTimeLog).subscribe(result => {
      console.log(result);
      this.initProjectAdded();
      this.cleanUp();
    }, error => console.log(error));
  }

  exportexcel(): void { // export to excel
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    if(this.fileName) XLSX.writeFile(wb, this.fileName);
  }

  public StartTimer = (): void => { // get start time, post on server
    this.startTime = new Date();
    this.newTimeLog = {
      startDate: this.startTime.toISOString()
    }
    this.timeLogService.create(this.newTimeLog).subscribe(result => {
      console.log(result);
      this.initProjectAdded();
    }, error => console.log(error));
  }

  public EndTimer = (projectName: string): void => { // get end time, calculate duration, update on server
    this.endTime = new Date();
    if (this.startTime) this.timePassed = (this.endTime.valueOf() - this.startTime.valueOf());

    this.projectId = this.timeLogs?.find(timeLog => timeLog.duration == null)?.id;
    console.log(this.projectId);

    if (this.startTime && this.timePassed) {
      this.newTimeLog = {
        id: this.projectId,
        projectName: projectName,
        startDate: this.startTime.toISOString(),
        endDate: this.endTime.toISOString(),
        duration: Math.round((this.timePassed/1000)*100)/100
      }
    }
    console.log(this.newTimeLog);


    this.timeLogService.update(this.newTimeLog).subscribe(result => {
      console.log(result);
      this.initProjectAdded();
      this.cleanUp();
    }, error => console.log(error));
  }
}

interface TimeLog { // TimeLog model
  id?: number;
  projectName?: string;
  startDate: string;
  endDate?: string;
  duration?: number;
}
