import { Component, OnInit } from '@angular/core';
import { FireserviceService } from "../fireservice.service";
import { DocumentReference, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private firestoreService: FireserviceService, private firestore: AngularFirestore) { }
  posts: any[];
  products: any[];
  weeklyMenu: any[];
  weeklyMeals: any[];

  daysOfWeek: any[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  getPosts() {
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

  getProducts() {
    this.firestoreService.getProducts().subscribe((products) => {

      this.products = [];
      products.map(product => {
        this.products.push({
          id: product.payload.doc.id,
          data: product.payload.doc.data()
        })
      })
      console.log('products:', this.products);
    })
  }

  getWeeklyMenu() {
    this.firestoreService.getWeeklyMenu().subscribe((weeklyMenu) => {

      this.weeklyMenu = [];
      weeklyMenu.map(menu => {

        // let x: DocumentReference[]  = menu.payload.doc.data() as DocumentReference[];

        // x.forEach(element => {
        //   console.log('doc:', element);
        // });

        let data = menu.payload.doc.data();

        this.weeklyMenu.push({
          id: menu.payload.doc.id,
          data: data
        });

        this.weeklyMeals = [];

        Object.keys(data).forEach((key) => {
          // console.log(key, data[key])
          this.firestore.doc(data[key]).valueChanges().subscribe(x => {
            //push to the meals array
            //console.log(x)
            this.weeklyMeals.push(x);
  
          })
  
        });


        //console.log('menu: ', menu.payload.doc.data());
        console.log('weeklyMeals: ', this.weeklyMeals);
      });




      console.log('weeklyMenu:', this.weeklyMenu);
    })
  }



  deletePost(id: string, image: string) {
    console.log(image)
    console.log(id)
    this.firestoreService.deletePost(id, image);
  }

  ngOnInit() {
    this.getPosts();
    this.getProducts();
    this.getWeeklyMenu();
  }


}
