import { Injectable } from '@angular/core';
import { HouseData } from './house-data';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private apiUrl =
    'https://api.mockfly.dev/mocks/125c96b7-d3b3-4b3d-aba2-9c071cb2d5c0/api/houses';
  protected housesList: HouseData[] = [];

  constructor(private http: HttpClient) {}

  getAllHousesList(): Observable<HouseData[]> {
    return this.http.get<HouseData[]>(this.apiUrl).pipe(
      tap((data) => (this.housesList = data)) // cache the result locally
    );
  }
  getHouseById(id: Number): Observable<HouseData | undefined> {
    if (this.housesList.length > 0) {
      // if cached, return immediately
      return of(this.housesList.find((house) => house.id === id));
    } else {
      // otherwise fetch and then find
      return this.getAllHousesList().pipe(
        map((houses) => houses.find((house) => house.id === id))
      );
    }
  }
}
