import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HouseData } from '../house-data';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-house-details!',
  imports: [CommonModule],
  template: `
    <article>
      <img class="listing-photo" [src]="singleHouseDetails?.photo" />
      <section class="listing-description">
        <h2 class="listing-heading">{{ singleHouseDetails?.name }}</h2>
        <p class="listing-location">
          {{ singleHouseDetails?.city }}, {{ singleHouseDetails?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Does this location have wifi: {{ singleHouseDetails?.wifi }}</li>
          <li>
            Does this location have laundry: {{ singleHouseDetails?.laundry }}
          </li>
        </ul>
      </section>
    </article>
  `,
  styleUrl: './house-details.component.css',
})
export class HouseDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  // the "singleHouseDetails" property can either be a valid house data or an undefined when the id does not match any of the houses' ids
  singleHouseDetails: HouseData | undefined;

  constructor() {
    const houseingLocationId = Number(this.route.snapshot.params['id']); // "id" since this is the name we defined in the route
    // use subscribe method of the observable to convert it to the HouseData interface
    this.housingService.getHouseById(houseingLocationId).subscribe((house) => {
      if (house) this.singleHouseDetails = house;
      else console.log(`House with id: ${houseingLocationId} not found`);
    });
  }
}
