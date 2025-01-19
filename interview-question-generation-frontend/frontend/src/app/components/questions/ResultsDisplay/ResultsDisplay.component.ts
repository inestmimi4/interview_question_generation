import {Component,  OnInit} from '@angular/core';
import {QuestionInterface} from "../../../interfaces/question.interface";
import {UserResponse} from "../../../interfaces/UserResponse.interface";
import {ResponseComponent} from "../Response/Response.component";
import {QuestiongenerationService} from "../../../services/questions_generation.service";

@Component({
  selector: 'app-ResultsDisplay',
  standalone: true,
  imports: [
    ResponseComponent
  ],
  templateUrl: './ResultsDisplay.component.html',
  styleUrl: './ResultsDisplay.component.scss'
})
export class ResultsDisplayComponent implements OnInit {
  questions: QuestionInterface[] = [];
  userResponses: UserResponse[] = [];
  score: number = 0;
  constructor(private questiongenerationService: QuestiongenerationService) {}
  get totalQuestions(): number {
    return this.questions.length;
  }
  ngOnInit(): void {
    this.questions = this.questiongenerationService.getStoredQuestions();
    this.userResponses = this.questiongenerationService.getStoredUserResponses();
    this.score = this.questiongenerationService.getScore();

  }

  getCorrectAnswers(question: QuestionInterface): string[] {
    return question.answers.map(answer => question.options[answer]);
  }

  getSelectedOptions(questionId: number): string[] {
    const response = this.userResponses.find(r => r.questionId === questionId);
    return response ? response.selectedOptions : [];
  }
  isCorrect(question: QuestionInterface, selectedOptions: string[]): boolean {
    const correctAnswers = this.getCorrectAnswers(question);
    return correctAnswers.every(answer => selectedOptions.includes(answer)) &&
        selectedOptions.every(option => correctAnswers.includes(option));
  }

}
