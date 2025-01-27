import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppState, EvaluatorStore } from '../../core/store/app.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluator',
  templateUrl: 'evaluator.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class EvaluatorComponent {
  private formFiledValidators = [
    Validators.required,
    Validators.min(3),
    Validators.max(15),
  ];

  protected store = inject(AppState);
  protected evaluatorStore = inject(EvaluatorStore);

  protected form = new FormGroup({
    red: new FormControl('', this.formFiledValidators),
    green: new FormControl('', this.formFiledValidators),
    blue: new FormControl('', this.formFiledValidators),
  });

  protected submitForm() {
    if (this.form.valid) {
      const values = this.form.value;

      this.evaluatorStore.processForm(values as Record<string, number>);
    }
  }
}
