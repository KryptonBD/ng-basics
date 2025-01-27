import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppState } from './core/store/app.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  store = inject(AppState);
}
