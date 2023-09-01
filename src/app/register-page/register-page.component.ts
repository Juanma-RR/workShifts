import { Component } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms'

@Component({
  selector: 'app-logout-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  public newForm = new FormGroup(
    {
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email
      ]),
      user: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6)
      ])
    },
    {
      validators: [this.isFieldOneEqualFieldTwo('password', 'confirmPassword')]
    }
  )

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value
      const fieldValue2 = formGroup.get(field2)?.value

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true })
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null)

      return null
    }
  }

  public isInvalidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched
  }
}
