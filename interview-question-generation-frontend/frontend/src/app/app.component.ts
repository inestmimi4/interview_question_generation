import { Component } from '@angular/core';
import { RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FilesComponent} from "./components/files/files.component";
import {FilesUploadComponent} from "./components/files/files-upload/files-upload.component";
import {FilesListComponent} from "./components/files/files-list/files-list.component";
import {HeaderComponent} from "./components/navigation/header/header.component";
import {FooterComponent} from "./components/navigation/footer/footer.component";
import {HomeComponent} from "./components/home/home.component";
import {ConfirmDialogComponent} from "./components/shared/confirm-dialog/confirm-dialog.component";
import {LoginComponent} from "./components/login/login.component";
import {QuizListComponent} from "./components/questions/QuizList/QuizList.component";
import {ResultsDisplayComponent} from "./components/questions/ResultsDisplay/ResultsDisplay.component";



@Component({
    imports: [RouterOutlet, CommonModule,
        FilesComponent, FilesUploadComponent, FilesListComponent, HeaderComponent, FooterComponent, HomeComponent, ConfirmDialogComponent, LoginComponent, QuizListComponent, ResultsDisplayComponent],
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'interview_question_generation';
}
