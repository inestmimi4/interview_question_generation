import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent,  HttpHeaders } from '@angular/common/http';
import{FileInterface} from "../interfaces/file.interface";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  upload(file: FileInterface): Observable<HttpEvent<unknown>> {
    const formData: FormData = new FormData();
    formData.append('file', file as unknown as Blob);
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.http.post<HttpEvent<unknown>>(`${this.baseUrl}/upload`, formData, { headers, observe: 'events', reportProgress: true });
  }


  getFiles(): Observable<FileInterface[]> {
    return this.http.get<FileInterface[]>(`${this.baseUrl}/files`);
  }

  deleteFile(fileId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/files/${fileId}`);
  }
  deleteAllFiles(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/files`);
  }
  searchFiles(searchTerm: string): Observable<FileInterface[]> {
    return this.http.get<FileInterface[]>(`${this.baseUrl}/files/name/${searchTerm}`);
  }
}

