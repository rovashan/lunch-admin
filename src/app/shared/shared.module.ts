import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

// Modules
const modules = [
  CommonModule,
  MaterialModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ],
  declarations: []
})
export class SharedModule { }
