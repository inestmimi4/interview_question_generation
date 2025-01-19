import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SnackbarType} from "./snackbar-type.enum";

@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss'
})
export class CustomSnackbarComponent implements OnChanges {
  @Input() message: string | null = null;
  @Input() type: SnackbarType = SnackbarType.Success;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && this.message) {
      setTimeout(() => {
        this.message = null;
      }, 1000);
    }
  }
}
