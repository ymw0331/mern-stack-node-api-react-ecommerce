import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const requireSignin = (req, res, next) => {
    // console.log( "REQ HEADERS =>", req.headers );
    // next();
    try {
        const decoded = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );

        // console.log("DECODED =>", decoded)
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json(err);
    }
};


export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send("Unauthorized")
        } else {
            next()
        }

    } catch (error) {
        console.log(error)
    }
}
