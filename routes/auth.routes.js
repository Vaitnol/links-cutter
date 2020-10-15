const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/user');
const router = Router();

router.post(
    '/register', 
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimal length 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data when register'
            })
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({message: 'Such user is already exsisted'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});

        await user.save()

        res.status(201).json({message: 'User has been made'});

    } catch (error) {
        res.status(500).json({message: 'Something went wrong, try again'});
    }
});

router.post(
    '/login', 
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(),
        check('passsword', 'Enter password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data when log in'
            })
        }

        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: 'User does not exist'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message: 'Incorrect password, try again!'});
        }

        const token =  jwt.sign(
            {userId: user.id},
            config.get('jwtsecret'),
            {expiresIn: '1h'}
        );

        res.json(token, userId);

    } catch (error) {
        res.status(500).json({message: 'Something went wrong, try again!'});
    }
});

module.exports = router;