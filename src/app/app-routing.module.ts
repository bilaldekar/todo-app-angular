import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasklistComponent } from './tasklist/tasklist.component';
import { ImportanttaskComponent } from './importanttask/importanttask.component';

const routes: Routes = [
  { path: "", redirectTo: "/myday", pathMatch: "full" },
  { path: "myday", component: TasklistComponent },
  { path: "important", component: ImportanttaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
