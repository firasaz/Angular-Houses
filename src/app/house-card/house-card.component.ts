import { Component, Input } from '@angular/core';
import { HouseData } from '../house-data';

@Component({
  standalone: true,
  selector: 'app-house-card',
  imports: [],
  template: `
    <section class="listing">
      <img [src]="houseData.photo" class="listing-photo" />
      <h2 class="listing-heading">{{ houseData.name }}</h2>
      <p class="listing-location">
        {{ houseData.city }}, {{ houseData.state }}
      </p>
    </section>
  `,
  styleUrl: './house-card.component.css',
})
export class HouseCardComponent {
  @Input() houseData!: HouseData; // @Input decorator is way to pass props from the parent to the child
}
