import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import {BehaviorSubject} from "rxjs";

import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class FireserviceService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private router: Router) { }
  
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  public percentage: any;

  public percentageChanges: BehaviorSubject<any> = new BehaviorSubject<any>(this.percentage);

  setPercentage(percent: any): void{
      this.percentage = percent;
      this.percentageChanges.next(percent);
  }



  //returning the posts
  public getPosts(){
    return this.firestore.collection("posts").snapshotChanges();
  }

  //delete the post
  public deletePost(docID: string, image: string){
    
    //get the reference to the image
    const storageRef = this.storage.storage.ref();
    storageRef.child(image).delete()
    .then(()=>{
      console.log("image delete")
    }).catch(err => {
      console.log(err)
    });
    this.firestore.collection("posts").doc(docID)
    .delete().then(()=>{
     console.log("post deleted")     
    }).catch(err => {
      console.log(err)
    })
  }

  // follow https://github.com/angular/angularfire2/blob/master/docs/storage/storage.md

  createPost(postData: FormData, file: any[]){
    // console.log(file);
    const image = file[0];

    //loop through the files array of objects in case of multiple images

    const filepath = Date.now() + "-" + file[0]["name"];
    
    //get the reference
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, image)
   
    //get the percentage
    this.uploadPercent = task.percentageChanges();
    //subscribe to the percentage
    
    this.uploadPercent.subscribe(percent => {
      console.log("x", percent);
      this.setPercentage(percent);
    })
    
    task.snapshotChanges().pipe(
      
      finalize(() => {
        console.log("File is being processed, you will be redirected soon...");
        fileRef.getDownloadURL().subscribe(url => {
          this.downloadURL = url;

          let newpost = {
            title : postData["title"],
            content : postData["content"],
            cover: this.downloadURL,
            fileref: filepath
          }

          //this.firestore.collection("posts").doc(filepath).set(newpost)

          this.firestore.collection("posts").add(newpost)
          .then(post => {
           /* get the reference of the document created
            console.log(post.path);
            this.firestore.doc(post.path).get().subscribe(x => {
              console.log(x.data());
            })
           */
          this.setPercentage(null);
            this.router.navigate(['/'])
          }).catch(err => {
            console.log("error: ", err);
          });
          
          
        })

      })
    ).subscribe()
   }
     //store the download link  with the rest of the data
  }



