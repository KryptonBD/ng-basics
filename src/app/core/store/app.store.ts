import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { EvaluatorService } from '../services/evaluation.service';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

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

export interface EvaluatorState {
  result: string | null;
  isEven: boolean;
}

const initialEvaluatorState: EvaluatorState = {
  result: null,
  isEven: false,
};

export const EvaluatorStore = signalStore(
  { providedIn: 'root' },
  withState(initialEvaluatorState),
  withMethods(
    (
      store,
      evaluatorService = inject(EvaluatorService),
      appState = inject(AppState)
    ) => ({
      processForm: rxMethod<Record<string, number>>(
        pipe(
          tap(() => appState.increaseBusy()),
          switchMap((values) => {
            return Promise.all([
              evaluatorService.concatenate(values).toPromise(),
              evaluatorService.parity(values).toPromise(),
            ]);
          }),
          tap(([result, isEven]) => {
            patchState(store, { result, isEven });
            appState.decreaseBusy();
          })
        )
      ),

      reset() {
        patchState(store, initialEvaluatorState);
      },
    })
  )
);
