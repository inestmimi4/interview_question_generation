import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionComponent } from './QuizQuestion.component';

describe('QuestionComponent', () => {
  let component: QuizQuestionComponent;
  let fixture: ComponentFixture<QuizQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
