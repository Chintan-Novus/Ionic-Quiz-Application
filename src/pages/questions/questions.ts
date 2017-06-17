import { Component, ViewChild } from '@angular/core';
import { ViewController, Slides, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
  styles: []
})
export class QuestionsPage {

  @ViewChild(Slides) slides: Slides;

  private questions = [];

  constructor(public viewCtrl: ViewController, private http: Http, public loadingCtrl: LoadingController) {
    let that = this
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    that.http.get('http://www.passneet.com/api/Mock.php').map((res) => res.json()).subscribe((data: any) =>{
      that.questions = data.QuestionsList;
      loader.dismiss();
    })
  }
  
  ionViewDidLoad() {
    let that = this;
    that.slides.lockSwipes(true);
    that.slides.enableKeyboardControl(false);
  }

  nextQuestion() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  previousQuestion() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  showResult() {
    let that = this;
    let correctAnswers = 0;
    that.questions.forEach(q => {
      if(q.UserAnswer == q.CorrectAnswer) {
        correctAnswers++;
      }
    })
    that.viewCtrl.dismiss({
      correctAnswers: correctAnswers,
      totalQuestions: that.questions.length
    });
  }
}
