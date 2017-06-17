import { Component } from '@angular/core';
import { QuestionsPage } from '../questions/questions';
import { ModalController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-page',
  templateUrl: 'page.html'
})
export class PagePage {

  constructor(public modalCtrl: ModalController, private alertCtrl: AlertController) {}

  goToQuestionsPage(){
    let that = this;
    let modal = this.modalCtrl.create(QuestionsPage);

    modal.onDidDismiss(data =>{
      let alert = that.alertCtrl.create({
        title: 'Your Result',
        subTitle: `You have correctly answered ${data.correctAnswers} of total ${data.totalQuestions} questions.`,
        buttons: ['Ok']
      });
      alert.present();
    })

    modal.present();
  }
}
