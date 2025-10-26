import {Request, Response} from "express";
import BaseIsAuthedMiddleware from '../../../middleware/IsAuthedMiddleware';
import jwt from "jsonwebtoken";
import tokenConfig from "../../../config/token";
import User from '../../../model/User';
import generateToken from '../../../lib/generateToken';
import UserType from "../../../type/UserType";

class IsAuthedMiddleware extends BaseIsAuthedMiddleware
{
    private user: UserType;
    protected async getToken (req: Request, res: Response): string|null {
        let token = req.cookies['accessToken'];
        let refreshToken = req.cookies['refreshToken'];

        if (!token && refreshToken) {
            try {
                const jwtSecret = tokenConfig.jwtAccessSecret;
                const userToken: any = jwt.verify(refreshToken, jwtSecret);
                const userItem: UserType = await User.findById(userToken.id);
                const generatedToken = generateToken(userItem);
                this.user = userItem;

                res.cookie('refreshToken', generatedToken.token.refreshToken, {
                    httpOnly: true,
                    //secure: true,
                    sameSite: 'strict',
                    maxAge: generatedToken.token.refreshTokenExpireTime
                });
                res.cookie('accessToken', generatedToken.token.accessToken, {
                    httpOnly: true,
                    //secure: true,
                    sameSite: 'strict',
                    maxAge: generatedToken.token.tokenExpireTime
                });

                token = generatedToken.token.accessToken;
            } catch (e) {
                return null;
            }
        }

        return token;
    }

    protected sendError (req: Request, res: Response) {
        console.warn('Invalid token or user not found');
    }

    protected async getUserByToken (req: Request, res: Response, userToken: any): Promise<UserType> {
        res.locals.isAuthenticated = false;
        res.locals.user = null;

        if (this.user) {
            return this.user;
        }

        return await User.findById(userToken.id);
    }

    protected userHasAccess (req: Request, res: Response, user: UserType) {
        res.locals.isAuthenticated = true;
        const {password, ...userData} = user.toObject();
        res.locals.user = userData;
    }
}

export default IsAuthedMiddleware;