import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from 'src/app/core/models/article';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  public localData: Article;
  public action: string;
  public articleFormGroup: FormGroup;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Article,
    public dialogRef: MatDialogRef<ArticleFormComponent>,
    public formBuilder: FormBuilder
  ) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
    this.buildForm();
    this.setAction();
  }

  buildForm() {
    this.articleFormGroup = this.formBuilder.group({
      id: [this.localData.id, Validators.required],
      createdAt: [this.localData.createdAt],
      updatedAt: [this.localData.updatedAt],
      name: [this.localData.name, Validators.required],
      category: [this.localData.category, Validators.required],
      unitPrice: [this.localData.unitPrice, Validators.required],
      stockUnits: [this.localData.stockUnits, Validators.required]
    });
  }

  setAction() {
    this.action = (this.localData.id) ? 'Update' : 'Add';
  }

  onAction() {
    this.dialogRef.close({ event: this.action, data: this.articleFormGroup.value });
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  errorHandling = (control: string, error: string) => {
    return this.articleFormGroup.controls[control].hasError(error);
  }
}
