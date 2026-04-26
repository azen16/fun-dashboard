import { Component, inject, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardStore } from './store/dashboard.store';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-dashboard',
  imports: [MatGridListModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [DashboardStore]
})
export class Dashboard implements OnInit {
  readonly store = inject(DashboardStore);

  ngOnInit() {
    this.store.fetchRandomDog();
    this.store.fetchBreeds();
  }
}
