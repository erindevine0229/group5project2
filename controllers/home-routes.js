const router = require('express').Router();
const {Event, Location} = require('../models');
const { withAuth } = require('../utils/auth');

//GET all events
router.get('/', async (req, res)=>{
    try {
        const 
        eventData = await Event.findAll ({
            include: [{
                model: Location,
                attributes: ['zip_code'],
            },
        ],
        });

        const events = eventData.map((event) =>
            event.get({plain: true })
        );
        res.render('homepage', {
            events, 
            loggedIn: req.session.loggedIn,
        });
    } catch{
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one event
router.get('/event/:event_id', withAuth, async (req, res) =>{
    try {
      const eventData = await Event.findByPk(req.params.event_id, {
        include: [{
            model: Location,
            attributes:[
                'location_id', 'zip_code',
            ],
        },
    ],
      });
      
      const event = eventData.get({ plain: true });
      res.render('event', {event, loggedIn: req.session.loggedIn});
    } catch {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    res.render('login')
});

router.get('/signup', async (req, res) => {
    res.render('signUp')
});


module.exports = router;