import {Component, HostListener, Input} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  @Input() text= '';
  visible = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.visible = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.visible = false;
  }
}
