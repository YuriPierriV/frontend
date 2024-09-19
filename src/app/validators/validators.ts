import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function senhaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // If the control is empty, the validation is not applied.
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasMinLength = value.length > 8;

    const senhaValid = hasUpperCase && hasLowerCase && hasMinLength;

    return !senhaValid ? { senhaInvalid: true } : null;
  };
}

