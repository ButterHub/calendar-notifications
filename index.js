const { google } = require('googleapis')

exports.informationGET = (req, res) => {
    res.send("Watch. Listen. Repeat.")
}

exports.calendarEventPOST = (req, res) => {
    // listen to new events -> get event information -> Send event information to Ionic
    console.log({req})
    res.send("Posted an event? This still needs to be implemented")
    // need to get a request of event contents?
}