const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { celebrate, Joi, errors } = require('celebrate');

router.post('/signup', celebrate({
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required()
    })
}), errors(), (req, res) => {
    const payload = req.body;
    console.log(payload)
    // password hash
    bcrypt.hash(payload.password, 10, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        payload.password = hash;
        var user = new User(payload);
        user.save().then(result => {
            console.log(result);
            res.status(200).json({
                data: 'user created'
            });
        }, error => {
            console.log(error);
        });
    });
})

router.post('/login', celebrate({
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
}), (req, res) => {
    console.log(req.body)
    User.find({ "username": req.body.username }, (err, doc) => {
        if (err) res.status(500).json({ status: 500 });
        console.log(doc[0]);
        bcrypt.compare(req.body.password, doc[0].password).then((isOk) => {
            console.log(isOk)
            if (isOk) res.status(200).json({ status: 200 });
            else res.status(403).json({
                status: 403
            });
        });
    });
});

module.exports = router;
