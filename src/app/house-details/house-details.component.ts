import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HouseData } from '../house-data';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-house-details!',
  imports: [CommonModule, ReactiveFormsModule],
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
          <li>Units available: {{ singleHouseDetails?.availableUnits }}</li>
          <li>Does this location have wifi: {{ singleHouseDetails?.wifi }}</li>
          <li>
            Does this location have laundry: {{ singleHouseDetails?.laundry }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="handleSubmitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />

          <label for="email">Email</label>
          <input id="email" type="text" formControlName="email" />

          <button class="primary" type="submit">Apply now</button>
        </form>
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
  // below is the form parts defined
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const houseingLocationId = Number(this.route.snapshot.params['id']); // "id" since this is the name we defined in the route
    // use subscribe method of the observable to convert it to the HouseData interface
    this.housingService.getHouseById(houseingLocationId).subscribe((house) => {
      if (house) this.singleHouseDetails = house;
      else console.log(`House with id: ${houseingLocationId} not found`);
    });
  }
  handleSubmitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value?.firstName ?? '',
      this.applyForm.value?.lastName ?? '',
      this.applyForm.value?.email ?? ''
    );
  }
}
