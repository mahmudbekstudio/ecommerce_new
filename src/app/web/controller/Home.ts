import Controller from "./Controller";
import { Request, Response } from 'express';
import Logger from "../../../middleware/Logger";

class Home extends Controller {
    constructor() {
        super();
        this.middlewares.push(Logger);
    }
    protected handle(req: Request, res: Response) {
        res.send('Hello World');
    }
}

export default Home;