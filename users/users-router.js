const router = require('express').Router();

const USERS = require('./users-model');
const restricted = require('../auth/auth-middleware');

//** ENDPOINT /api/users */
router.get('/', restricted, (req, res) => {
    USERS.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.status(500).json(err));
});

function byDepartment(dept) {
    return function(req, res, next) {
        if(req.user && req.user.department && req.user.department.toLowercase() === dept) {
            next();
        } else {
            res.status(403).json({ errorMessage: 'Could not retreive users in that department.'})
        };
    };
}

module.exports = router;