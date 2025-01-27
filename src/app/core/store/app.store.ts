import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export interface BustState {
  count: number;
}

const initialState = {
  count: 0,
};

export const AppState = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store) => ({
    increaseBusy() {
      patchState(store, (state) => ({
        count: state.count + 1,
      }));
    },

    decreaseBusy() {
      patchState(store, (state) => ({
        count: state.count - 1,
      }));
    },

    clearBusy() {
      patchState(store, { count: 0 });
    },
  })),

  withComputed(({ count }) => ({
    isBusy: computed(() => count() > 0),
  }))
);
