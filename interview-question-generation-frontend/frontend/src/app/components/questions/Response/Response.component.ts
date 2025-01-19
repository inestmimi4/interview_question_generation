import {Component, Input} from '@angular/core';
import { QuestionInterface } from "../../../interfaces/question.interface";
import { UserResponse } from "../../../interfaces/UserResponse.interface";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-Response',
  standalone: true,
  templateUrl: 'Response.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./Response.component.scss']
})
export class ResponseComponent {
  @Input() question!: QuestionInterface;
  @Input() userResponses!: UserResponse[];
  @Input() isCorrect!: boolean;
  @Input() correctAnswers!: string[];
  @Input() selectedOptions!: string[];

}
