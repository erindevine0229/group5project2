const router = require('express').Router();
///////////////////////
const { Event, Location } = require('../models');
const { withAuth } = require('../utils/auth');
///////////////////////////
// router.get('/', async (req, res) => {
//     res.render('homepage')
// });
/////////////////////////////////////////////////////////////
router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            include: [{
                model: Location,
                attributes: ['zip_code'],
            }]
        });

        const events = eventData.map((event) =>
            event.get({ plain: true })
        );
        res.render('homepage', {
            events,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one event
router.get('/event/:event_id',  async (req, res) => {
    try {
        const eventData = await Event.findByPk(req.params.event_id, {
            include: [{
                model: Location,
                attributes: [
                    'location_id', 'location_name', 'zip_code',
                ],
            },
            ],
        });

        const event = eventData.get({ plain: true });
        res.render('event', { event, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/location/:location_id',  async (req, res) => {
    try {
        const dbLocationData = await Location.findByPk(req.params.location_id);

        const location = dbLocationData.get({ plain: true });

        res.render('event', { location, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

//////////////////////////////////////////////////////////

router.get('/signup', async (req, res) => {
    res.render('signUp')
});


module.exports = router;