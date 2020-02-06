type AnyClass = {
    new(): any; // tslint:disable-line
};

interface IControllerMeta {
    req: Request;
    res: Response;
}

import { Request, Response, NextFunction } from 'express';

export default class BaseController {
    private req: Request;
    private res: Response;

    static action(ControllerClass: AnyClass, methodName: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            const object = new ControllerClass();
            // Injecting Req and Res
            if (object.setMeta) {
                object.setMeta(req, res);
            }

            if (methodName in object) object[methodName](req, res, next);
            else {
                const error = new Error(`An action method was not found [${ControllerClass.constructor.name}] [${methodName}]`);
                // tslint:disable-next-line: no-console
                console.error(error.message);
                next(error);
            }
        };
    }

    public setMeta(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    public getMeta(): IControllerMeta {
        return {
            req: this.req,
            res: this.res
        };
    }
}