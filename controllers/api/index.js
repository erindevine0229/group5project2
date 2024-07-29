const router = require('express').Router();

//const userRoutes = require('./user-routes.js');
const userRoutes = require('./user-routes.js');

//router.use('/users', userRoutes);
router.use('/user', userRoutes);

module.exports = router;