import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'header-fullscreen',
  template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'" style='color:#fff;cursor:pointer'></i>

  `,
  host: {
    '[class.d-block]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderFullScreenComponent {
  status = false;
  private get sf(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  @HostListener('window:resize')
  _resize() {
    console.log(this.sf.isFullscreen);
    this.status = this.sf.isFullscreen;
  }

  @HostListener('click')
  _click() {
    if (this.sf.enabled) {
      this.sf.toggle();
    }
  }
}
