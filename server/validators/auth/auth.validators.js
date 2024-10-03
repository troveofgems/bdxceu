import {body, validationResult} from "express-validator";

export const validateSignupData = async (req, res, next) => {
    await body('firstName')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('First name must be between 1 and 200 characters')
        .run(req);

    await body('firstName').custom((value, { req }) => {
        const allowedChars = /^[a-zA-Z\s'-]/;
        if (!allowedChars.test(value)) {
            throw new Error('First name must only contain alphabetic characters, spaces, apostrophes, or hyphens');
        }
        return true;
    }).run(req);
    await body('middleInitial')
        .isLength({ min: 0, max: 1 })
        .optional()
        .withMessage('Middle Initial must be between 0 and 1 characters')
        .run(req);

    await body('lastName')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Last name must be between 1 and 200 characters')
        .run(req);

    await body('lastName').custom((value, { req }) => {
        const allowedChars = /^[a-zA-Z\s'-]/;
        if (!allowedChars.test(value)) {
            throw new Error('Last name must only contain alphabetic characters, spaces, apostrophes, or hyphens');
        }
        return true;
    }).run(req);

    await body('email')
        .isEmail()
        .withMessage('Email Address is required')
        .run(req);

    await body('password')
        .isLength({ min: 8, max: 30 })
        .withMessage('Password must be between 8 and 30 characters')
        .run(req);

    await body('password')
        .not()
        .isUppercase()
        .withMessage('Password must contain at least one lowercase letter')
        .run(req);

    await body('password')
        .not()
        .isLowercase()
        .withMessage('Password must contain at least one uppercase letter')
        .run(req);

    await body('password')
        .not()
        .isNumeric()
        .withMessage('Password must contain at least one numeric digit')
        .run(req);

    await body('password').custom((value) => {
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        if (!hasSpecialChar) {
            throw new Error('Password must contain at least one special character from list: !@#$%^&*(),.?":{}|<>');
        }
        return true;
    }).run(req);

    let validatedResults = validationResult(req);

    if(validatedResults.isEmpty()) {
        return next();
    }
    return res.status(400).json(validatedResults.array());
};

export const validateLoginData = async (req, res, next) => {
    await body('email')
        .isEmail()
        .withMessage('Email Address is required')
        .run(req);

    await body('password')
        .isLength({ min: 8, max: 30 })
        .withMessage('Password must be between 8 and 30 characters')
        .run(req);

    let validatedResults = validationResult(req);

    if(validatedResults.isEmpty()) {
        return next();
    }
    return res.status(400).json(validatedResults.array());
};

export const validateForgotPasswordData = async (req, res, next) => {
    await body('email')
        .isEmail()
        .withMessage('Email Address is required')
        .run(req);

    let validatedResults = validationResult(req);

    if(validatedResults.isEmpty()) {
        return next();
    }
    return res.status(400).json(validatedResults.array());
};

export const validateChangePasswordData = async (req, res, next) => {
    await body('password')
        .isLength({ min: 8, max: 30 })
        .withMessage('Password must be between 8 and 30 characters')
        .run(req);

    await body('password')
        .not()
        .isUppercase()
        .withMessage('Password must contain at least one lowercase letter')
        .run(req);

    await body('password')
        .not()
        .isLowercase()
        .withMessage('Password must contain at least one uppercase letter')
        .run(req);

    await body('password')
        .not()
        .isNumeric()
        .withMessage('Password must contain at least one numeric digit')
        .run(req);

    await body('password').custom((value) => {
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        if (!hasSpecialChar) {
            throw new Error('Password must contain at least one special character from list: !@#$%^&*(),.?":{}|<>');
        }
        return true;
    }).run(req);

    await body('passwordConfirmation').custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage('Password and Password Confirmation Must Match')
        .run(req);

    let validatedResults = validationResult(req);

    if(validatedResults.isEmpty()) {
        return next();
    }
    return res.status(400).json(validatedResults.array());
};