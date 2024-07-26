const router = require('express').Router();

//const userRoutes = require('./user-routes.js');
const eventRoutes = require('./event-routes.js');
const userRoutes = require('./user-routes.js');

//router.use('/users', userRoutes);
router.use('/event', eventRoutes);
router.use('/user', userRoutes);

module.exports = router;