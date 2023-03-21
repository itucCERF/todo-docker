import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 250
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 250
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 250
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
})

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY, { expiresIn: 60 * 60 });
    user.tokens = user.tokens.concat({token});
    await user.save(
        function (err) {
            if (err) return handleError(err);
        }
    );
    return token;
}

// Search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return false;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return false;
    }
    return user;
}

// export default mongoose.model('User', userSchema);
const User = mongoose.model('User', userSchema);
export default User;