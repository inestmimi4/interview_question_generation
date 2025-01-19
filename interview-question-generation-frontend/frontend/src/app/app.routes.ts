import { Routes } from '@angular/router';


export const routes: Routes = [
    {path:'',loadComponent:()=>import('./components/home/home.component').then(m=>m.HomeComponent)},
    {path:'home',loadComponent:()=>import('./components/home/home.component').then(m=>m.HomeComponent)},
    {path: 'upload', loadComponent: () => import('./components/files/files.component').then(m => m.FilesComponent) },
    {path:'results',loadComponent:()=>import('./components/questions/ResultsDisplay/ResultsDisplay.component').then(m=>m.ResultsDisplayComponent)},
    {path:'test',loadComponent:()=>import('./components/questions/QuizList/QuizList.component').then(m=>m.QuizListComponent)},
    {path:'quiz-list',loadComponent:()=>import('./components/questions/QuizList/QuizList.component').then(m=>m.QuizListComponent)},
    {path:'login',loadComponent:()=>import('./components/login/login.component').then(m=>m.LoginComponent)}
];
