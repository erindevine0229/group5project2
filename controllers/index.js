const router = require('express').Router();

const userRoutes = require('./api/user-routes.js');
const eventRoutes = require('./api/event-routes.js');

router.use('/users', userRoutes);
router.use('/event', eventRoutes);

module.exports = router;