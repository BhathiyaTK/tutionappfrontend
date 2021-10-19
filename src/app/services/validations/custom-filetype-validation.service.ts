import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomFiletypeValidationService {

  constructor() { }

  requiredFileTypes (type: string) {
    return function (formGroup: FormGroup) {
      const file = formGroup.value;
      if ( file ) {
        const extension = file.split('.')[1].toLowerCase();
        if ( type.toLowerCase() !== extension.toLowerCase() ) {
          return {
            requiredFileTypes: true
          };
        }
        return null;
      }
      return null;
    };
  }
}
