import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async(req, response, next) => {
    if (!req.header('Authorization')) {
        return response.status(400).send('Invalid Token!');
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return response.status(401).send('Access Denied!');

    const verified = jwt.verify(token, process.env.JWT_KEY);
    try {
        const user = await User.findOne({ _id: verified._id, 'tokens.token': token }, 'name email');
        if (!user) {
            return response.status(400).send('Invalid Token!');
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send('Not authorized to access this resource!' );
    }
};

export default auth;