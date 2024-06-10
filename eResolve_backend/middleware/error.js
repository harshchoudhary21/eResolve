const ErrorResponse=require('../utils/errorHandler');

module.exports=(err,req,res,next)=>{
    let statusCode = 500;
    let message = 'Internal Server Error';
    if(err instanceof ErrorResponse){
        statusCode=err.statusCode;
        message=err.message;
    }
    if(err.name==='CastError'){
        const message=`Resource not found.Invalid:${err.path}`;
        err=new ErrorResponse(message,404);
    }
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`;
        err=new ErrorResponse(message,400);
    }
    if(err.name==='ValidationError'){
        const message=Object.values(err.errors).map(value=>value.message);
        err=new ErrorResponse(message,400);
    }
    res.status(statusCode).json({
        success:false,
        error:message
    });
}
