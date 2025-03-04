import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-value-bar',
  imports: [CommonModule],
  templateUrl: './value-bar.component.html',
  styleUrl: './value-bar.component.scss'
})
export class ValueBarComponent {
  @Input() isHorizontal: boolean = false;
  @Input() length: number = 100;
  @Input() thickness: number = 10;
  @Input() valueBarPositiveHeight: number = 1;
  valueBarNegativeHeight: number = 100 - this.valueBarPositiveHeight;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valueBarPositiveHeight']) {
      this.valueBarNegativeHeight = 100 - this.valueBarPositiveHeight;
    }
  }
}
