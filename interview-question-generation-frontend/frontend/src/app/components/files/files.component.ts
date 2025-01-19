import {Component, OnInit} from '@angular/core';
import {FilesUploadComponent} from "./files-upload/files-upload.component";
import { FilesListComponent} from "./files-list/files-list.component";
import {FileUploadService} from "../../services/fileupload.service";
import {FileInterface} from "../../interfaces/file.interface";
import {HttpEventType} from "@angular/common/http";
import {CustomSnackbarComponent} from "../shared/custom-snackbar/custom-snackbar.component";
import {ConfirmDialogComponent} from "../shared/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarType} from "../shared/custom-snackbar/snackbar-type.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  standalone: true,
  imports: [
    FilesUploadComponent,
    FilesListComponent,
    CustomSnackbarComponent,
  ],
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  files: FileInterface[] = [];
  selectedFile: FileInterface | null = null;
  snackbarMessage: string | null = null;
  snackbarType: SnackbarType = SnackbarType.Success;

  constructor(private fileUploadService: FileUploadService,public dialog: MatDialog,private router: Router) {}

  ngOnInit() {
    this.loadFiles();
  }

  onFileSelected(file: FileInterface) {
    this.selectedFile = file;
  }

  onUpload() {
    if (this.selectedFile) {
      this.fileUploadService.upload(this.selectedFile).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            this.loadFiles();
            this.showSnackbar('Upload successfully', SnackbarType.Success);
          }
        },
        error: () => {
          this.showSnackbar('Upload failed', SnackbarType.Error);
        }
      });
    }
  }

  loadFiles() {
    this.fileUploadService.getFiles().subscribe({
      next: (response: FileInterface[]) => {
        this.files = response;
      },
      error: (error) => {
        console.error('Error loading files', error);
      }
    });
  }
  deleteFile(fileId: number) {
    const file = this.files.find(f => f.id === fileId);
    if (file) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message: ` ${file.name}?` }
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.fileUploadService.deleteFile(fileId).subscribe({
            next: () => {
              this.files = this.files.filter(file => file.id !== fileId);
              this.showSnackbar('File deleted successfully', SnackbarType.Success);
            },
            error: () => {
              this.showSnackbar('Delete failed', SnackbarType.Error);
            }
          });
        }
      });
    }
  }

  deleteAllFiles() {
    this.fileUploadService.deleteAllFiles().subscribe({
      next: () => {
        this.files = [];
        this.showSnackbar('All Files deleted successfully', SnackbarType.Success);
      },
      error: () => {
        this.showSnackbar('Failed delete files', SnackbarType.Error);
      }
    });
  }

  onSearch(searchTerm: string) {
    if (searchTerm) {
      this.fileUploadService.searchFiles(searchTerm).subscribe({
        next: (response: FileInterface[]) => {
          this.files = response;
        },
        error: (error) => {
          console.error('Error searching files', error);
        }
      });
    }
    else{
      this.loadFiles();
    }
  }

  deleteSelectedFiles(fileIds: number[]) {
    if (fileIds.length > 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message: ` ${fileIds.length} files?` }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const deleteObservables = fileIds.map(id => this.fileUploadService.deleteFile(id));

          deleteObservables.forEach(observable =>
              observable.subscribe({
                next: () => {
                  this.files = this.files.filter(file => !fileIds.includes(file.id));
                  this.showSnackbar('Selected files deleted successfully', SnackbarType.Success);
                },
                error: () => {
                  this.showSnackbar('Failed to delete some files', SnackbarType.Error);
                }
              })
          );
        }
      });
    }
  }

  private showSnackbar(message: string,type: SnackbarType) {
    this.snackbarMessage = message;
    this.snackbarType = type;
    setTimeout(() => this.snackbarMessage = null, 1000);
  }
  navigateToQuizList() {
    this.router.navigate(['/quiz-list']).then(
        success => console.log('Navigation successful!',success),
        error => console.error('Navigation failed!', error)
    );
  }

  }
