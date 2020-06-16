import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Article } from 'src/app/core/models/article';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  public localData: Article;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Article,
    public dialogRef: MatDialogRef<ArticleDetailComponent>,
  ) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
