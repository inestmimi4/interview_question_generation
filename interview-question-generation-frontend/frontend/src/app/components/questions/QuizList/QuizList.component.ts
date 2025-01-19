import { Component, OnInit } from '@angular/core';
import { QuestionInterface } from "../../../interfaces/question.interface";
import { QuizQuestionComponent } from "../QuizQuestion/QuizQuestion.component";
import {QuestiongenerationService} from "../../../services/questions_generation.service";
import {UserResponse} from "../../../interfaces/UserResponse.interface";
import {TimerComponent} from "../../shared/timer/timer.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-QuizList',
  standalone: true,
  imports: [
    QuizQuestionComponent,
    TimerComponent
  ],
  templateUrl: './QuizList.component.html',
  styleUrls: ['./QuizList.component.scss']
})
export class QuizListComponent implements OnInit {
  questions: QuestionInterface[] = [];
  userResponses: UserResponse[] = [];

  constructor(private questiongenerationService: QuestiongenerationService,private router: Router) {}

  ngOnInit(): void {
    this.questiongenerationService.getQuestions().subscribe({
      next: (data) => this.questions = data,
      error: () => alert('')
    });
  }
  onOptionChange(questionId: number, option: string, isChecked: boolean): void {
    const response = this.userResponses.find(r => r.questionId === questionId);

    if (response) {
      if (isChecked) {
        response.selectedOptions.push(option);
      } else {
        const index = response.selectedOptions.indexOf(option);
        if (index > -1) {
          response.selectedOptions.splice(index, 1);
        }
      }
    } else {
      this.userResponses.push({
        questionId: questionId,
        selectedOptions: [option]
      });
    }
  }

  onSubmit(): void {
    this.questiongenerationService.setQuestions(this.questions);
    this.questiongenerationService.setUserResponses(this.userResponses);
    let score = 0;
    this.questions.forEach(question => {
      const userResponse = this.userResponses.find(r => r.questionId === question.id);
      if (userResponse) {
        const isCorrect = question.answers.every(answer =>
            userResponse.selectedOptions.includes(question.options[answer])
        );
        if (isCorrect) {
          score += 1;
        }
      }
    });
    this.questiongenerationService.updateScore(score);
    this.router.navigate(['results']).catch(error => {
      console.error('Navigation error:', error);
    });}

}
