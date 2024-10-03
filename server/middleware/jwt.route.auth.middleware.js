import jwt from "jsonwebtoken";
import User from ""
import {ErrorResponse} from "./Error/error.class.js";

export const level1Protection = async(req, res, next) => {
    const token = req.cookies.userBdxceu;

    if(token === null) return next(new ErrorResponse(process.env.JWT_UNAUTH_MESSAGE, 401));

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);

    let userFound = await User.findOne({
        where: {
            email: decodedToken.email
        }
    });
    if(!userFound) return next(new ErrorResponse("Invalid JWT Provided.", 400));

    delete userFound.password;

    req.body.user = {...userFound}

    return next();
}

export const clearAppCookies = async function(req, res, next) {
    res.clearCookie();

}