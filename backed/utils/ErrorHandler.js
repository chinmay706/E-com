

// class errorHandler extends Error {
//     constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
//         super(message);
//         this.statusCode = statusCode;
//         this.success = false;
//         this.errors = errors;

//         if (stack) {
//             this.stack = stack;
//         } else {
//             Error.captureStackTrace(this, this.constructor);
//         }
//     }
// }

// export { errorHandler };



class errorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Capture the stack trace properly
        Error.captureStackTrace(this, this.constructor);
    }
}

export { errorHandler };


