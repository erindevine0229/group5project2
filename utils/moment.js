const moment = require('moment')

function timeAndDate() {
    const currentDate = moment().format('MMMM Do YYY');
    const currentTime = moment().format('h:mm a');
    const bannerMessage = (`It is currently ${currentDate} at ${currentTime}`);
    return bannerMessage
}

module.exports = {timeAndDate}