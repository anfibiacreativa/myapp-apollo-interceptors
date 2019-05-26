import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';


@Injectable()
export class CommonReqInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthenticationService,
    private injector: Injector
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Instantiate AuthenticationService
      const token: any = this.auth.getToken();
      const clonedReq: any = req.clone({
          withCredentials: true,
          headers: req.headers
              .set('Content-Type', 'application/json')
              .set('token', token || ''),
      });
      return next.handle(clonedReq).pipe(map((event: HttpEvent<any>) => {
          if (req instanceof HttpRequest) {
              if (req.url.indexOf('api') >= 0 /* && req.method === 'PUT' */) {
                console.info('I am intercepting a request of data from the api');
              }
          }
          return event;
      }));
      
  }
}