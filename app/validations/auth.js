import joi from 'joi';

const registerValidator = (data) => {
    const rule = joi.object({
        /* Custom error message
        // name: joi.string().min(6).max(225).required().messages({
        //     'string.base': `"a" should be a type of 'text'`,
        //     'string.empty': `"a" cannot be an empty field`,
        //     'string.min': `"a" should have a minimum length of {#limit}`,
        //     'any.required': `"a" is a required field`
        //   }),
        */
        name: joi.string().min(6).max(225).required(),
        email: joi.string().min(6).max(225).required().email(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    })

    return rule.validate(data);
}

const _registerValidator = registerValidator;
export { _registerValidator as registerValidator };