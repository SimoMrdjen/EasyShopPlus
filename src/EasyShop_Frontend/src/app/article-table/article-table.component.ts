import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css']
})
export class ArticleTableComponent {
  public articles: Article[] = [];
  title: string = '';
  articles$: Observable<Article[]>;

  constructor(
    private articleService: ArticleService
  ) {
    this.articles$ = this.articleService.getArticles();
  }

  getCustomers(): void {
    this.articleService.getArticles().subscribe({
      next: (response: any) => {
        console.log(response);
        this.articles = <any>response;
        console.log(this.articles);
      },
      error: (err: any) => {
        alert('Error occurred');
      },
    });
  }
  openEditArticle(article: Article): void {
    this.title = 'Edit';
    this.articleService.isAddingArticle = false;
    this.articleService.setArticle(article);
    this.articleService.open();
  }
}
