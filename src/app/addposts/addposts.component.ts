import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";

import {FireserviceService } from "../fireservice.service";


@Component({
  selector: 'app-addposts',
  templateUrl: './addposts.component.html',
  styleUrls: ['./addposts.component.css']
})
export class AddpostsComponent implements OnInit {

  
  constructor(private firestoreService: FireserviceService){
  }
  
  image:any = null; //list of files
  percentage: any = this.firestoreService.percentage;
  public postsForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('',  Validators.required),
      cover: new FormControl('',  Validators.required),
  
  
  });

  public handleInput($event: Event){
    //getting the image or files
    this.image = $event.target["files"];
    console.log(this.image);
  }

  //submit
  public addPost(data: FormData){
    this.firestoreService.createPost(data, this.image);
  }


  ngOnInit() {
    this.firestoreService.percentageChanges.subscribe( x => this.percentage = x);
  }

}
