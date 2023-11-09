//abstract class for all customized errors to inherit to verify the structure of errors
export abstract class CustomError extends Error {
    abstract statusCode: number;
    
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): { message: string; field?: string }[];

}