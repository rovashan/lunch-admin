import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire'; // AngularFire module
import { AngularFirestore } from '@angular/fire/firestore';// Firestore module
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage'; //FireStorage and Bucket

//service
import { FireserviceService } from "./fireservice.service";
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule
  ],
  providers: [AngularFirestore, FireserviceService ,{ provide: StorageBucket, useValue: "gs://firestorage-a8260.appspot.com"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
