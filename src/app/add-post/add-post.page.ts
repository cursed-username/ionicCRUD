import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import {Post} from "../models/post.model";
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {
  post = {} as Post;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async createPost(post: Post){
    if (this.formValidation()) {
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();
      (await loader).dismiss();
      this.navCtrl.navigateRoot("home");
      try {
        await this.firestore.collection("posts").add(post);
      } catch(e) {
        this.showToast(e);
      }
    }
  }

  formValidation(){
    if(!this.post.title){
      this.showToast("Enter title");
      return false;
    }

    if(!this.post.details){
      this.showToast("Enter details");
      return false;
    }

    return true;
  }
  
  showToast(message: string) {
    this.toastCtrl .create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present())
  }
}
