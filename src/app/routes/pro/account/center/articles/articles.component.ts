import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-account-center-articles',
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountCenterArticlesComponent {
  list: any[];
  imgSrc = JSON.parse(localStorage.getItem("_token")).avatar

  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef) {
    console.log(this.imgSrc)
    this.http.post('/angular/articles', { pageNum: 8, id: JSON.parse(localStorage.getItem("_token")).id }).subscribe((res: any) => {
      this.list = res.data;
      this.cdr.detectChanges();
    });
  }
}
