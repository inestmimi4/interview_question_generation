import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestionInterface} from "../../../interfaces/question.interface";
import {OptionChangeInterface} from "../../../interfaces/OptionChange.interface";

@Component({
  selector: 'app-QuizQuestion',
  standalone: true,
  imports: [],
  templateUrl: './QuizQuestion.component.html',
  styleUrl: './QuizQuestion.component.scss'
})
export class QuizQuestionComponent {
  @Input() question!: QuestionInterface;
  @Output() optionChange = new EventEmitter<OptionChangeInterface>();

  onOptionChange(option: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.optionChange.emit({ questionId: this.question.id, option: option, isChecked: checkbox.checked });
  }

}
