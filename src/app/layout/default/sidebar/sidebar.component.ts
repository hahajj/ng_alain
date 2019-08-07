import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService, _HttpClient } from '@delon/theme';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  settings = JSON.parse(localStorage.getItem("_token"))



  // constructor(public settings: SettingsService) {
  //   console.log(settings);
  // }

  constructor(public http: _HttpClient) {

  }

  ngOnInit() {
    this.http
      .post('http://192.168.1.229:8022/angular/recordList', {
        id: JSON.parse(localStorage.getItem("_token")).id
      })
      .subscribe((res: any) => {
        console.log(res)
        if (res.code != 1) {
          return;
        }


      });
  }

}
