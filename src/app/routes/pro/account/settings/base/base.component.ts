import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { zip } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-account-settings-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountSettingsBaseComponent implements OnInit {
  avatar = '';
  userLoading = true;
  user: any;

  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef, private msg: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    zip(this.http.post('/angular/userInfo', { id: JSON.parse(localStorage.getItem("_token")).id }), this.http.get('/geo/province')).subscribe(([user, province]: any) => {
      this.userLoading = false;
      this.user = user.data.info;
      this.provinces = province;
      // this.choProvince(user.geographic.province.key, false);
      this.cdr.detectChanges();
    });
  }

  // #region geo

  provinces: any[] = [];
  cities: any[] = [];

  choProvince(pid: string, cleanCity = true) {
    this.http.get(`/geo/${pid}`).subscribe((res: any) => {
      this.cities = res;
      if (cleanCity) this.user.geographic.city.key = '';
      this.cdr.detectChanges();
    });
  }

  // #endregion

  save(): void {
    const obj = this.user;
    obj.id = JSON.parse(localStorage.getItem("_token")).id;
    this.http
      .post('/angular/changeInfo', obj)
      .subscribe((res: any) => {
        if (res.code == 1) {
          this.msg.success("更新成功！");
          this.router.navigateByUrl(`/pro/account/center/articles`)
        } else {
          this.msg.success("网络故障！");
        }
      })
  }
}
