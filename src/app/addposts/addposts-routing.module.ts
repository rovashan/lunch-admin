import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AddpostsComponent} from "./addposts.component";

const routes: Routes = [
  { path: '', component: AddpostsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddpostsRoutingModule { }