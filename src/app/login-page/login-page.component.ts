import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public myForm: FormGroup = this.fb.group({
    user: ['User', Validators.required],
    password: ['Password', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder) {}

  onSave(): void {}

  isValidField(field: string) {
    return this.myForm.controls[field].errors
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null
    const errors = this.myForm.controls[field].errors || {}
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required'

        case 'minlength':
          return `Min ${errors['minlength'].requiredLength} characters.`
      }
    }

    return null
  }

  showPasswordAndIcon(): void {
    const pwd: HTMLInputElement | null = document.getElementById(
      'pass'
    ) as HTMLInputElement
    const icon: HTMLInputElement | null = document.getElementById(
      'icon'
    ) as HTMLInputElement

    if (pwd.type === 'password') {
      pwd.type = 'text'
      icon.className = 'pi pi-eye-slash'
    } else {
      pwd.type = 'password'
      icon.className = 'pi pi-eye'
    }
    return
  }
}
