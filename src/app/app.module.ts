import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {PanelModule} from 'primeng/panel';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DatePipe } from '@angular/common';

import {ListboxModule} from 'primeng/listbox';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';

import { TasklistComponent } from './tasklist/tasklist.component';
import { ImportanttaskComponent } from './importanttask/importanttask.component';


import {InputSwitchModule} from 'primeng/inputswitch';
import {CheckboxModule} from 'primeng/checkbox';
import { TaskService } from './task.service';
import { FormsModule } from '@angular/forms';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import { ArchiveComponent } from './archive/archive.component';



@NgModule({
  declarations: [
    AppComponent,
    TasklistComponent,
    ImportanttaskComponent,
    ArchiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    PanelModule,
    BrowserAnimationsModule,
    ListboxModule,
    MenuModule,
    ButtonModule,
    InputSwitchModule,
    CheckboxModule,
    MenubarModule,
    InputTextModule
  ],
  providers: [DatePipe, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
