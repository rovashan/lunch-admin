import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
  { path: '', loadChildren: './main/main.module#MainModule' },
  { path: 'addpost', loadChildren: './addposts/addposts.module#AddpostsModule' },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
