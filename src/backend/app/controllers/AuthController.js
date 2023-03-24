import jwt from 'jsonwebtoken';
import User from './../models/User.js';
// import bcrypt from 'bcryptjs';
import { registerValidator } from './../validations/auth.js';

const authController = {};

authController.register = async (req, res, next) => {
    const { error } = registerValidator(req.body);
    if (error) return res.status(422).send(error.details[0].message);

    const checkEmailExist = await User.findOne({ email: req.body.email });
    if (checkEmailExist) return res.status(422).send('Email is exist');

    try {
        const user = new User(req.body);
        // const newUser = await user.save(); #it'll save on next function
        const token = await user.generateAuthToken()
        return res.send(user);
    } catch (err) {
        return res.status(400).send(err);
    }
}

authController.login = async (req, res, next) => {
    try {
        // const user = await User.findOne({email: email});
        // if (!user) return res.status(422).send('Email or Password is not correct');
        // const checkPassword = await bcrypt.compare(req.body.password, user.password);
        // if (!checkPassword) return res.status(422).send('Email or Password is not correct');
        // res.header('auth-token', token).send(token);
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(422).send({error: 'Login failed! Email or Password was not correct'});
        }
        const token = await user.generateAuthToken();
        return res.send({ user, token });
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default authController;
