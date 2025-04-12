import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HouseData } from '../house-data';

@Component({
  standalone: true,
  selector: 'app-house-card',
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img [src]="houseData.photo" class="listing-photo" />
      <h2 class="listing-heading">{{ houseData.name }}</h2>
      <p class="listing-location">
        {{ houseData.city }}, {{ houseData.state }}
      </p>
      <a [routerLink]="['details', houseData.id]">Learn More</a>
    </section>
  `,
  styleUrl: './house-card.component.css',
})
export class HouseCardComponent {
  @Input() houseData!: HouseData; // @Input decorator is way to pass props from the parent to the child
}
