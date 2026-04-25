import { Component, inject, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardStore } from './dashboard.store';
@Component({
  selector: 'app-dashboard',
  imports: [MatGridListModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [DashboardStore]
})
export class Dashboard implements OnInit {
  readonly store = inject(DashboardStore);

  ngOnInit() {
    this.store.fetchRandomDog();
  }
}
