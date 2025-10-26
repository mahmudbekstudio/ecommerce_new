import Middleware from "./Middleware";
import e from "express";

class Logger extends Middleware
{
    protected handle(req: e.Request, res: e.Response, next: e.NextFunction) {
        console.log('Log: ', req.method, ':', req.url);
        next();
    }
}

export default Logger;