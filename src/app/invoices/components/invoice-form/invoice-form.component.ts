import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      ingredients: this.formBuilder.array([this.buildIngredients])
    });
  }

  buildIngredients(): FormGroup {
    return this.formBuilder.group({
      article: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

}
