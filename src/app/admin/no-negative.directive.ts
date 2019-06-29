import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appNoNegative]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: NoNegativeDirective, multi: true}
  ]
})
export class NoNegativeDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const price = control.value as number;
    return price < 0 ? {negative: true} : null;
  }

  constructor() { }

}
