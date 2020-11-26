import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore) {}
  

  ionViewWillEnter() {}
    posts: any
  async getPosts() {
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    try {
      this.firestore.collection("posts")
      .snapshotChanges()
      .subscribe(data => {
        this.posts = data.map(e => {
          return {
            id: e.payload.doc.id,
            title: e.payload.doc.data()["title"],
            details: e.payload.doc.data()["details"]
          }
        })
      })
    } catch(e) {
      this.showToast(e);
    }
  }
  showToast(message: string) {
    this.toastCtrl .create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present())
  }
}
