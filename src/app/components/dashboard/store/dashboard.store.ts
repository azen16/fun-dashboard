import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, switchMap, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { DashboardState } from '../models/dashboard-state';
import { DogService } from '../../../services/dog-service';

const initialState: DashboardState = {
  loading: false,
  currentDog: '',
  dogList: []
};

export const DashboardStore = signalStore(
  withState(initialState),
  withMethods((store, dogService = inject(DogService)) => ({
    // Action to fetch a random dog
    fetchRandomDog: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() => dogService.getRandomDog().pipe(
          tap((res) => patchState(store, { currentDog: typeof (res.message) == 'string' ? res.message : '', loading: false })),
          catchError((err) => {
            console.error(err);
            patchState(store, { loading: false });
            return of(null);
          })
        ))
      )
    ),
    // Action to fetch dog breeds
    fetchBreeds: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() => dogService.getBreeds().pipe(
          tap((res) => patchState(store, {
            dogList: typeof res.message !== 'string' && !Array.isArray(res.message) ? [res.message] : [],
            loading: false
          })),
          catchError((err) => {
            console.error(err);
            patchState(store, { loading: false });
            return of(null);
          })
        ))
      )
    )
  }))
);

