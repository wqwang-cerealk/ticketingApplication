import { ValidationError } from 'express-validator';
import { CustomError } from "./custom-error";

//use interface to verify errors we created has necessary attributes/methods
//but when translate to JS, interface no longer exist --> so we need to use abtract class
// interface CustomError {
//     statusCode: number;
//     serializeErrors(): {
//         message: string;
//         field?: string;
//     }[]
// }

export class RequestValidationError extends CustomError {
    statusCode = 400;
    //ValidationError is an array as might be email or password error
    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');

        //extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    //serialize errors to return a response so error-handler does not need to structure response to avoid
    //giganic error-handler
    serializeErrors() {
        return this.errors.map(err => {
            if (err.type === 'field') {
                return { message: err.msg, field: err.path }
            }
            return { message: err.msg };
        });
    }
}

// throw new RequestValidationError(errors); 
