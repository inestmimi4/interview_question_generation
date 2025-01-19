import {Component, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle,

} from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose
  ],
templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  constructor(
      public dialogRef: MatDialogRef<ConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
