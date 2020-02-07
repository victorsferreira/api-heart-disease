import { Request, Response, NextFunction, Router } from 'express';

type Fn = () => any;

type AnyClass = {
    new(): any; // tslint:disable-line
};

// Subclass of Abstract class
type AnyControllerClass = new () => BaseController;

interface IControllerMeta {
    req: Request;
    res: Response;
}

export default abstract class BaseController {
    private req: Request;
    private res: Response;

    static route(method: string, path, ControllerClass: AnyControllerClass, methodName: string, middlewares:Fn[] = []): Router {
        const router = Router();
        router[method](path, middlewares, BaseController.action(ControllerClass, methodName));

        return router;
    }

    static action(ControllerClass: AnyControllerClass, methodName: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            const object = new ControllerClass();
            // Injecting Req and Res
            if (object.setMeta) {
                object.setMeta(req, res);
            }

            if (methodName in object) object[methodName](req, res, next);
            else {
                const error = new Error(`The Controllers's method was not found [${ControllerClass.constructor.name}] [${methodName}]`);
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