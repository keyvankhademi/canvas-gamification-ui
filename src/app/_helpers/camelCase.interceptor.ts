import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CamelCaseInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<never>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<unknown>) => {
                if (event instanceof HttpResponse) {
                    console.log(event.body);
                    console.log(this.keysToCamel(event.body));
                }
                return event;
            }));
    }

    toCamel(s: string) : string {
        return s.replace(/([-_][a-z])/ig, ($1) => {
            return $1.toUpperCase()
                .replace('-', '')
                .replace('_', '');
        });
    }

    keysToCamel(obj: unknown) : unknown {
        if (obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function') {
            const n = {};
            Object.keys(obj)
                .forEach((k) => {
                    n[this.toCamel(k)] = this.keysToCamel(obj[k]);
                });
            return n;
        } else if (Array.isArray(obj)) {
            return obj.map((i) => {
                return this.keysToCamel(i);
            });
        }
        return obj;
    }
}
