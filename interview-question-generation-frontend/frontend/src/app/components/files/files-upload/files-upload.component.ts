import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FileInterface} from "../../../interfaces/file.interface";
import {ExtensionIcons} from "../../../constants/extensionIcons.constants";



@Component({
  selector: 'app-files-upload',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './files-upload.component.html',
  styleUrl: './files-upload.component.scss'
})
export class FilesUploadComponent {
  selectedFile: FileInterface | null = null;
  @Output() fileSelected = new EventEmitter<FileInterface>();
  @Output() uploadFile = new EventEmitter<void>();
  extensionIcons=ExtensionIcons;

  onFileSelected(event :any) {
    this.selectedFile = event.target.files[0];
    const input = event.target as HTMLInputElement;
    const fileNameElement = document.getElementById('file-name') as HTMLSpanElement;
    const iconElement = document.getElementById('file-icon') as HTMLDivElement;
    if (input.files && input.files.length > 0) {
      const fileNameWithExtension = input.files[0].name;
      const fileExtension = this.getFileExtension(fileNameWithExtension);
      const fileNameWithoutExtension = this.removeFileExtension(fileNameWithExtension);
      fileNameElement.textContent = this.truncateFileName(fileNameWithoutExtension, 20);
      iconElement.innerHTML = this.extensionIcons[fileExtension] || ExtensionIcons['default'];
    } else {
      fileNameElement.textContent = 'No file selected';
    }

    if (this.selectedFile) {
      this.fileSelected.emit(this.selectedFile);
    }
  }
  getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }
  removeFileExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName;
    }
    return fileName.substring(0, lastDotIndex);
  }
  truncateFileName(fileName: string, maxLength: number): string {
    if (fileName.length > maxLength) {
      return fileName.substring(0, maxLength) + '...';
    }
    return fileName;
  }
  onUpload() {
    this.uploadFile.emit();

  }

}