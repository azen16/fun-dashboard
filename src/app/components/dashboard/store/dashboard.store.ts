import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, switchMap, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { DashboardState } from '../models/dashboard-state';
import { DogService } from '../../../services/dog-service';
import { DogBreed } from '../../../shared/models/dog-breed.model';

const initialState: DashboardState = {
  loading: false,
  currentDog: {} as DogBreed,
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
          tap((res) => {
            let dog = {} as DogBreed;
            if (typeof (res.message) == 'string') {
              let breed = res.message.split('/')[4];
              dog = {
                image: res.message,
                breed,
              } as DogBreed;
            }
            patchState(store, { currentDog: dog, loading: false })
          }),
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
          tap((res) => {
            let dogList: any[] = [];
            if (typeof res.message !== 'string' && !Array.isArray(res.message)) {
              dogList = Object.entries(res.message).map(([breed, subBreeds]) => ({
                breed,
                subBreeds
              }));
            }
            patchState(store, { dogList, loading: false });
          }),
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

