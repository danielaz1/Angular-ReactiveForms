import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {
    public static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            // if control is empty return no error
            return null;
          }
          const valid = regex.test(control.value);
          return valid ? null : error;
        };
      }

    public static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password').value;
        const confirmPassword: string = control.get('confirmPassword').value;5
        if (password !== confirmPassword) {
          control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
        }
      }

    static get account_validation_messages()  {return {
        name: [
          { type: 'required', message: 'Imię jest wymagane' },
          { type: 'minlength', message: 'Imię musi posiadać przynajmniej 2 znaki' },
          { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
          { type: 'pattern', message: 'Your username must contain only numbers and letters' },
          { type: 'validUsername', message: 'Your username has already been taken' }
        ],
        surname: [
          { type: 'required', message: 'Nazwisko jest wymagane' },
          { type: 'minlength', message: 'Nazwisko musi posiadać przynajmniej 2 znaki' }
        ],
        email: [
          { type: 'required', message: 'Email jest wymagany' },
          { type: 'email', message: 'Email jest niepoprawny' }
        ],
        phone: [
          { type: 'pattern', message: 'Telefon może zawierać wyłącznie cyfry, spacje oraz znaki + ( ) -' }
        ],
        confirmPassword: [
          { type: 'required', message: 'Proszę potwierdzić hasło' },
          { type: 'areEqual', message: 'Password mismatch' }
        ],
        password: [
          { type: 'required', message: 'Hasło jest wymagane' },
          { type: 'minlength', message: 'Hasło musi składać się z co najmniej 8 znaków' },
          { type: 'hasCapitalCase' && 'hasSpecialCharacters', message: 'Hasło musi zawierać przynajmniej jedną wielką literę oraz jeden ze znaków: @ # $ % ^ &' }
        ],
        pet: [
          { type: 'required', message: 'Proszę wybrać zwierzę' }
        ],
        city: [
            { type: 'required', message: 'Miasto jest wymagane' }
          ],
        street: [
            { type: 'required', message: 'Ulica jest wymagana' }
          ],
        building: [
            { type: 'required', message: 'Nr budynku jest wymagany' }
          ],
          newsletter: [
            { type: 'required', message: 'Zgoda na newsletter jest wymagana' }
          ],
        };
    }
}
