import {Request, Response} from "express";
import BaseIsAuthedMiddleware from '../../../middleware/IsAuthedMiddleware';
import User from '../../../model/User';
import UserType from "../../../type/UserType";

class IsAuthedMiddleware extends BaseIsAuthedMiddleware
{
    protected getToken (req: Request, res: Response): string|null {
        return req.header('Authorization')?.replace('Bearer: ', '');;
    }

    protected sendError (req: Request, res: Response) {
        res.statusCode = 401;
        res.send({result: false, error: 'Access token is not valid'});
    }

    protected async getUserByToken (req: Request, res: Response, userToken: any): Promise<UserType> {
        return await User.findById(userToken.id);
    }

}

export default IsAuthedMiddleware;