import { ApiError } from '../exceptions/api-errors.js';

const errorMiddleware = (error, req, res, next) => {
    console.error(error); 

    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
};

export default errorMiddleware;