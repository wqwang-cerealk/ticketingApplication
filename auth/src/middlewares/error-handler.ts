import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    //check which type of error it is and send back reponse about error to user
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({ errors: [{ message: 'Something went wrong'}]});
};