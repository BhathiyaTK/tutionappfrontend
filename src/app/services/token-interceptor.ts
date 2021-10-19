import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    avoidReqUrls: Array<string>;
    multiHeaderReqUrls: Array<string>;

    constructor(private injector: Injector){
        this.avoidReqUrls = ['login','newstudent/register','newteacher/register','getAllUsers','passwordforget'];
        this.multiHeaderReqUrls = ['admin/newclass'];
    }

    intercept(req, next){
        let authService = this.injector.get(AuthService);
        if (this.isValidReqUrl(req.url)) {
            if (this.isMultiHeaderReqUrl(req.url)) {
                let tokenizeReq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${authService.getToken()}`,
                        'Content-Type': 'application/json',
                        'charset': 'utf-8'
                    }
                })
                return next.handle(tokenizeReq);
            }else{
                let tokenizeReq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${authService.getToken()}`
                    }
                })
                return next.handle(tokenizeReq);
            }
        }
        return next.handle(req);
    }


    posIndicator:string = 'masterybackend.tk/';

    private isValidReqUrl(reqUrl: string): boolean{
        let position = reqUrl.indexOf(this.posIndicator);

        if (position > 0) {
            let destination:string = reqUrl.substr(position + this.posIndicator.length);

            for (let url of this.avoidReqUrls){
                let rg = new RegExp(url);
                if (rg.test(destination)){
                    return false;
                }
            }
        }
        return true;
    }

    private isMultiHeaderReqUrl(reqUrl: string): boolean{
        let position = reqUrl.indexOf(this.posIndicator);

        if (position > 0) {
            let destination:string = reqUrl.substr(position + this.posIndicator.length);

            for (let url of this.multiHeaderReqUrls){
                let rg = new RegExp(url);
                if (rg.test(destination)){
                    return true;
                }
            }
        }
        return false;
    }
}