import {Request, Response, NextFunction} from "express";

class Middleware
{
    protected handle (req: Request, res: Response, next: NextFunction) {
        throw Error("Not declared");
    }

    public get execute () {
        const currenObject = this;

        return (req: Request, res: Response, next: NextFunction) => {
            currenObject.handle(req, res, next);
        }
    }
}

export default Middleware