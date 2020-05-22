import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  articleFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.articleFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      unitPrice: ['', Validators.required],
      stockUnits: ['', Validators.required]
    });
  }

}
