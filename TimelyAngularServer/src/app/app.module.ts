import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimerPopUpComponent } from './timer-pop-up/timer-pop-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { EditProjectComponent } from './edit-project/edit-project.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerPopUpComponent,
    EditProjectComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, NgbModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
