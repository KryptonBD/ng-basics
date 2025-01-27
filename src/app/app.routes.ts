import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'next',
    loadComponent: () =>
      import('./features/evaluator/evaluator.component').then(
        (c) => c.EvaluatorComponent
      ),
  },
];
