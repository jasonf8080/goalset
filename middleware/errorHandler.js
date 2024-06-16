import { StatusCodes } from "http-status-codes"

const errorHandlerMiddleware = (err, req, res, next) => {
   
    if(err.code && err.code === 11000){
        res.status(500).json({message: 'Email already in use'})
    } else if(err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    } else {
        res.status(500).json({message: err.message})
    }
    }
   

export default errorHandlerMiddleware