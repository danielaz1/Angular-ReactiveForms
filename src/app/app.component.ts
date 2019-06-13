import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Angular-ReactiveForms';
  account_validation_messages = CustomValidators.account_validation_messages;
  phonePattern = '[- +()0-9]*';

  public registeredUser = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    surname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(this.phonePattern)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.compose([
      CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      CustomValidators.patternValidator(/[@#$%^&]/, { hasSpecialCharacters: true })
    ])]],
    confirmPassword: ['', [Validators.required]],
    pet: ['', [Validators.required]],
    address: this.fb.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      building: ['', [Validators.required]],
      flatNo: ['']
    }),
    consents: this.fb.group({
      newsletter: [false, [Validators.requiredTrue]],
      sms: false
    })
  },
  {
    validator: CustomValidators.passwordMatchValidator
});


   constructor(private fb: FormBuilder) {
    this.registeredUser.valueChanges.subscribe(val => {
      if (this.registeredUser.valid) {
        console.log(val);
      }
    });
   }

  get name() { return this.registeredUser.get('name'); }
  get email() { return this.registeredUser.get('email'); }

  onSubmit() {
    this.cleanForm(this.registeredUser);
    if (this.registeredUser.valid) {
      console.table(this.registeredUser);
    }  else {
      this.validateAllFormFields(this.registeredUser);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  public cleanForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.setValue(formGroup.get(field).value.toString().trim());
      } else if (control instanceof FormGroup) {
        this.cleanForm(control);
      }
    });
  }
}
