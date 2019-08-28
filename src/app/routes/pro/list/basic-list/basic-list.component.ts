import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { ProBasicListEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-basic-list',
  templateUrl: './basic-list.component.html',
  styleUrls: ['./basic-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProBasicListComponent implements OnInit {
  q: any = {
    status: 'all',
  };
  loading = false;
  pageTotal = 1;
  pageSize = 10;
  pageNum = 1;
  myTask: number;


  data: any[] = [];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modal: ModalHelper,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.getData();
  }

  // getData() {
  //   this.loading = true;
  //   this.http.get('/api/list', { count: 5 }).subscribe((res: any) => {
  //     this.data = res;
  //     this.loading = false;
  //     this.cdr.detectChanges();
  //   });
  // }

  getData() {
    this.loading = true;
    this.http.post('/angular/apiList', { id: JSON.parse(localStorage.getItem("_token")).id, pageNum: this.pageNum, pageSize: this.pageSize }).subscribe((res: any) => {
      this.myTask = res.counts
      this.data = res.data.list;
      this.pageTotal = res.data.total;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
  openEdit(record: any = {}) {
    this.modal.create(ProBasicListEditComponent, { record }, { size: 'md' }).subscribe(res => {
      // if (record.id) {
      //   record = { ...record, id: 'mock_id', percent: 0, ...res };
      // } else {
      //   this.data.splice(0, 0, res);
      //   this.data = [...this.data];
      //   console.log(this.data)
      // }
      // this.cdr.detectChanges();
      res.userId = JSON.parse(localStorage.getItem("_token")).id
      this.http.post('/angular/addApiList', res).subscribe((resp: any) => {
        if (resp.code == 1) {
          this.getData()
        } else {
          console.log("err")
        }
      });
    });
  }
}
