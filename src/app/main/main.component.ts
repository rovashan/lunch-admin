import { Component, OnInit } from '@angular/core';
import {FireserviceService } from "../fireservice.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private firestoreService: FireserviceService) { }
  posts: any[];

  getPosts(){
    this.firestoreService.getPosts().subscribe((posts) => {
      
      this.posts = [];
      posts.map(post => {
       this.posts.push({
          id: post.payload.doc.id,
          data: post.payload.doc.data()
        })
      })
      console.log(this.posts);
    })
  }

  
  deletePost(id:string, image: string){
    console.log(image)
    console.log(id)
    this.firestoreService.deletePost(id, image);
  }

  ngOnInit() {
    this.getPosts();
  }

}
