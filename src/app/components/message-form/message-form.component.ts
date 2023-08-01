import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @Output() formData: EventEmitter<{
    message: string;
  }> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: ['', Validators.required],
    });
  }

  get message() {
    return this.form.get('message');
  }

  onSubmit() {
    this.formData.emit(this.form.value);
  }
}
