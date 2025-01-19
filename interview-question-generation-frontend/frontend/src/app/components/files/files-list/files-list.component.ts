import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FileInterface} from "../../../interfaces/file.interface";
import {TooltipComponent} from "../../shared/tooltip/tooltip.component";
import {HEADERS} from "../../../constants/headers.constants";

@Component({
    selector: 'app-files-list',
    templateUrl: './files-list.component.html',
    standalone: true,
    styleUrls: ['./files-list.component.scss'],
    imports: [FormsModule, CommonModule, TooltipComponent],

})
export class FilesListComponent {

    @Input() files: FileInterface[] = [];
    @Output() fileDeleted = new EventEmitter<number>();
    @Output() allFilesDeleted = new EventEmitter<void>();
    @Output() search = new EventEmitter<string>();
    @Output() deleteSelected = new EventEmitter<number[]>();
    @Output() viewFile = new EventEmitter<number>();

    filteredFiles: FileInterface[] = [];
    searchTerm = '';
    headers = HEADERS;
    selectedFiles: number[] = [];
    allSelected = false;
    originalFiles: FileInterface[] = [];

    onDelete(fileId: number) {
        this.fileDeleted.emit(fileId);
    }

    deleteSelectedFiles() {
        this.deleteSelected.emit(this.selectedFiles);
    }

    onSearch() {
        this.filterFiles();
    }
    filterFiles() {

        if (this.searchTerm.trim() === '') {
            this.search.emit();
        }
        else {
            const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
            this.filteredFiles = this.files.filter(file =>
                file.name.toLowerCase().startsWith(lowerCaseSearchTerm)

            );
            this.originalFiles=this.files;
            this.files=this.filteredFiles;


        }

    }
    toggleAllSelection() {
        this.allSelected = !this.allSelected;
        if (this.allSelected) {

            this.selectedFiles = this.files.map(file => file.id);
        }
        else {
           this.selectedFiles = [];
        }
        this.updateAllSelectedStatus();
    }

    toggleFileSelection(fileId: number) {
        if (this.selectedFiles.includes(fileId)) {
            this.selectedFiles = this.selectedFiles.filter(id => id !== fileId);
        } else {
            this.selectedFiles.push(fileId);
        }
        this.updateAllSelectedStatus();
    }

    isSelected(fileId: number): boolean {
        return this.selectedFiles.includes(fileId);
    }

    updateAllSelectedStatus() {
        this.allSelected = this.files.length > 0 &&
            this.files.every(file => this.selectedFiles.includes(file.id));
    }
    navigateToQuizList() {
        this.viewFile.emit();
    }

}
