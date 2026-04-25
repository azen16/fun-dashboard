import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DogResponse } from '../shared/models/dog-response.model';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private readonly baseUrl = 'https://dog.ceo/api';
  private http = inject(HttpClient);

  getRandomDog(): Observable<DogResponse> {
    return this.http.get<DogResponse>(`${this.baseUrl}/breeds/image/random`);
  }

  getBreeds() {
    return this.http.get(`${this.baseUrl}/breeds/list/all`);
  }
}
