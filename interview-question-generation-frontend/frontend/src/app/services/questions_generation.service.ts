import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuestionInterface} from "../interfaces/question.interface";
import {UserResponse} from "../interfaces/UserResponse.interface";


@Injectable({
  providedIn: 'root'
})
export class QuestiongenerationService {
  private apiUrl = 'http://localhost:3000/questions';
  private questions: QuestionInterface[] = [];
  private userResponses: UserResponse[] = [];
  private totalScore: number = 0;
  constructor(private http: HttpClient) { }

  getQuestions(): Observable<QuestionInterface[]> {
    return this.http.get<QuestionInterface[]>(this.apiUrl);
  }

  setQuestions(questions: QuestionInterface[]): void {
    this.questions = questions;
  }

  getStoredQuestions(): QuestionInterface[] {
    return this.questions;
  }

  setUserResponses(userResponses: UserResponse[]): void {
    this.userResponses = userResponses;
  }

  getStoredUserResponses(): UserResponse[] {
    return this.userResponses;
  }
  updateScore(score: number): void {
    this.totalScore += score;
  }

  getScore(): number {
    return this.totalScore;
  }
}
