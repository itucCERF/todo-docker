import User from './../models/User.js';
const userCtrl = {};

// Get All users
userCtrl.getAll = async (req, res) => {
    try {
        let users = await User.find({}, 'name email').exec();
        return res.send(users);
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
};

// Get user by userId
userCtrl.detail = async (req, res) => {
    try {
        let user = await User.findById(req.params.userId, 'name email');
        if (!user) {
            return res.status(400).send({ message: "User not found!" });
        }
        return res.send(user);
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}

// Update user by userId
userCtrl.update = async (req, res) => {
    try {
        let user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(400).send({ message: "User not found!" });
        }
        Object.assign(user, req.body);
        await user.save();
        return res.json(user);
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}

// Delete User By ID
userCtrl.delete = async (req, res) => {
    try {
        let user = await User.findByIdAndRemove(req.params.userId);
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }
        return res.json({ message: "User deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
};

// Logout current devices
userCtrl.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
}

// Logout all devices
userCtrl.logoutAll = async (req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
}

export default userCtrl;
