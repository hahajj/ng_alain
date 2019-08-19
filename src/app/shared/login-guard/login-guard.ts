import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injector, Injectable } from '@angular/core';
import { StartupService } from '@core/startup/startup.service';
@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private injector: Injector,
        public st: StartupService,
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log(route.routeConfig)
        console.log("状态" + state)
        console.log(route.routeConfig.data)
        if (!route.routeConfig.data) {
            return this.logIn();
        } else {
            if (route.routeConfig.data.pro) {
                return this.logIn();
            } else {
                this.goTo('/404')
            }

        }
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log(route.routeConfig)
        console.log("状态" + state)
        console.log(route.routeConfig.data)
        if (!route.routeConfig.data) {
            return this.logIn();
        } else {
            if (route.routeConfig.data.pro) {
                return this.logIn();
            } else {
                this.goTo('/404')
            }

        }
    }
    private logIn() {
        const token = localStorage.getItem('token');
        console.log(123)
        if (!token) {
            this.goTo('/passport/login');
            return false;
        } else {
            return true;
        }
        return true;
    }
    private goTo(url: string) {
        setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    }
}

