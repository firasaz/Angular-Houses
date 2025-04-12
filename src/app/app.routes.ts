import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HouseDetailsComponent } from './house-details/house-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'details/:id',
    component: HouseDetailsComponent,
  },
];
