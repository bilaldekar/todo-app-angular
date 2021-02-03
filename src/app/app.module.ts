import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PanelModule } from 'primeng-lts/panel';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DatePipe } from '@angular/common';

import { ListboxModule } from 'primeng-lts/listbox';
import { MenuModule } from 'primeng-lts/menu';
import { ButtonModule } from 'primeng-lts/button';

import { TasklistComponent } from './tasklist/tasklist.component';
import { ImportanttaskComponent } from './importanttask/importanttask.component';


import { InputSwitchModule } from 'primeng-lts/inputswitch';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { TaskService } from './task.service';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng-lts/menubar';
import { InputTextModule } from 'primeng-lts/inputtext';
import { ArchiveComponent } from './archive/archive.component';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { OrderListModule } from 'primeng-lts/orderlist';

import { TableModule } from 'primeng-lts/table';



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
    FormsModule,
    PanelModule,
    BrowserAnimationsModule,
    ListboxModule,
    MenuModule,
    ButtonModule,
    InputSwitchModule,
    CheckboxModule,
    MenubarModule,
    InputTextModule,
    ConfirmDialogModule,
    LoadingBarRouterModule, OrderListModule, TableModule
  ],
  providers: [DatePipe, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
