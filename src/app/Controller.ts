import { Request, Response, Application } from 'express';
import getApp from "../lib/getApp";
import { z } from 'zod';

class Controller {
    protected app: Application;
    protected request: z.ZodObject|null = null;
    protected middlewares: any[] = [];

    constructor() {
        this.app = getApp();
    }

    protected beforeHandle (req: Request, res: Response) {
        //
    }

    protected handle (req: Request, res: Response) {
        throw Error("Not declared");
    }

    protected afterHandle (req: Request, res: Response) {
        //
    }

    public get execute () {
        const currenObject = this;
        return [
            ...this.middlewares.map(middleware => {
                return (new middleware).execute;
            }),
            (req: Request, res: Response) => {
                currenObject.beforeHandle(req, res);
                currenObject.handle(req, res);
                currenObject.afterHandle(req, res);
            }
        ]
    }
}

export default Controller;