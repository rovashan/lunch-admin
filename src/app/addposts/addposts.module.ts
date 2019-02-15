import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import { AddpostsRoutingModule } from './addposts-routing.module';
import { AddpostsComponent } from './addposts.component';

//need to import ReactiveForms module here too
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AddpostsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddpostsComponent]
})
export class AddpostsModule { }
