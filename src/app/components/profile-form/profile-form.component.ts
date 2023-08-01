import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  @Output() formData: EventEmitter<{
    fullName: string;
    email: string;
    oldPassword: string;
    newPassword: string;
  }> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get oldPassword() {
    return this.form.get('oldPassword');
  }
  get fullName() {
    return this.form.get('fullName');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }

  onSubmit() {
    this.formData.emit(this.form.value);
  }
}
