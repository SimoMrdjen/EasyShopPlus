import { Component, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent {

  visible = false;
  article: Article | null = null;
  private visibilitySubscription: Subscription | undefined;
  //roles = Object.keys(Role).filter((k) => typeof Role[k as any] === 'number');
  @Input() title: string = '';

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    console.log('on init in EditUserComponent');
    this.visibilitySubscription = this.articleService.visibility$.subscribe(
      (isVisible) => {
        this.visible = isVisible;
        if (this.visible) {
          this.article = this.articleService.article;
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.visibilitySubscription?.unsubscribe();
  }
  close(): void {
    this.articleService.close();
  }

  open(): void {
    this.articleService.open();
  }

  editOrAddArticle() {
    if (this.articleService.isAddingArticle) {
      this.addArticle();
    } else {
      this.editArticle();
      this.articleService.isAddingArticle = true;
    }
  }

  editArticle() {
    if (this.article) {
      this.articleService.editArticle(this.article).subscribe({
        next: (response) => {
          console.log(response);
          this.notification.create(
            'success',
            'Succesfull',
            `${response.code} is succesfuly edited!`
          );
        },
        error: (err) => {
          this.notification.create('error', 'Error!',
           `Error in editing!`);
        },
      });
    }
    this.close();
    this.articleService.setArticle(new Article());
  }

  addArticle() {
    if (this.article) {
      this.articleService.addArticle(this.article).subscribe({
        next: (response) => {
          console.log(response);
          this.notification.create(
            'success',
            'Succesfull',
            `${response.code} is succesfuly added!`
          );
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }
    this.close();
    this.articleService.setArticle(new Article());
  }
  openAddArticle() {
    this.title = 'Create';
    this.articleService.isAddingArticle = true;
    this.articleService.article = new Article();
    this.open();
  }
}
