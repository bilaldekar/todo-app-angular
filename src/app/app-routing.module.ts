import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasklistComponent } from './tasklist/tasklist.component';
import { ImportanttaskComponent } from './importanttask/importanttask.component';
import { ArchiveComponent } from './archive/archive.component';

const routes: Routes = [
  { path: "", redirectTo: "/myday", pathMatch: "full" },
  { path: "myday", component: TasklistComponent },
  { path: "important", component: ImportanttaskComponent },
  { path: "archive", component: ArchiveComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
