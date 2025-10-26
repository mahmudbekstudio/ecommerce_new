import Middleware from './Middleware';
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import tokenConfig from '../config/token';
import userStatuses from "../config/userStatuses";

class IsAuthedMiddleware extends Middleware
{
    protected handle (req: Request, res: Response, next: NextFunction) {
        try {
            const token = this.getToken(req, res);
            if (!token) throw Error('Token is not exist');

            const jwtSecret = tokenConfig.jwtAccessSecret;
            const userToken: any = jwt.verify(token, jwtSecret);
            const user = this.getUserByToken(req, res, userToken);

            if (user.type !== userStatuses.ACTIVE) throw Error('Token is not active token');
            this.userHasAccess(req, res, user);
            next();
        } catch (e) {
            this.sendError(req, res);
        }
    }

    protected getToken (req: Request, res: Response): string|null {
        return '';
    }

    protected sendError (req: Request, res: Response) {
        //
    }

    protected getUserByToken (req: Request, res: Response, userToken: any): any {
        //
    }

    protected userHasAccess (req: Request, res: Response, user: any): any {
        //
    }
}

export default IsAuthedMiddleware;