import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseCardComponent } from '../house-card/house-card.component';
import { HouseData } from '../house-data';
import { HousingService } from '../housing.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, HouseCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  houses: HouseData[] = [];

  constructor(private housingService: HousingService) {}

  ngOnInit(): void {
    this.housingService
      .getAllHousesList()
      .subscribe((data) => (this.houses = data));
  }
}
