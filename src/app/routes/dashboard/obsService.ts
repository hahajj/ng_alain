import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, fromEvent } from 'rxjs';
import { take, filter, map, takeUntil, concatAll, concat } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class obsService {
    constructor(
        private http: HttpClient,
    ) { }

    obs() {
        const body = document.body;
        const mouseUp = fromEvent(body, 'mouseup');
        const mouseMove = fromEvent(body, 'mousemove');
        const els = document.getElementsByClassName('btn002');

        Array.prototype.forEach.call(els, (element, index) => {
            const mouseDown = fromEvent(element, 'mousedown');
            const source = mouseDown.pipe(map(event => mouseMove.pipe(takeUntil(mouseUp)))).pipe(concatAll());
            source
                .pipe(
                    map((event: MouseEvent) => {
                        return {
                            x: event.clientX,
                            y: event.clientY,
                        };
                    }),
                )
                .subscribe(pos => {
                    element.style.left = pos.x - 280 - index * 424 + 'px';
                    element.style.top = pos.y - 140 + 'px';
                });
        });
    }

    //   getHeroes() {
    //     this.http.post("http://192.168.1.229:84/login",
    //       { name: "admin", pwd: "111111" })
    //       .subscribe((val) => { console.log("POST call successful value returned in body", val) }, response => { console.log("POST call in error", response); }, () => { console.log("The POST observable is now completed."); });
    //   }

    //   getCityArea(): Observable<City[]> {
    //     this.getHeroes()
    //     return of(this.acc)
    //   }
}
