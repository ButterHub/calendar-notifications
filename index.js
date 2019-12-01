const { google } = require('googleapis')
const express = require('express')
const app = express()
const fetchEvent = require('./fetchEvent')
const cors = require('cors')
require('dotenv').config()

app.use(cors())

let newEvent = false;

app.get('/', (req, res) => {
    res.send("Watch. Listen. Repeat.")
})

app.get('/poll', (req, res) => {
    if(newEvent) {
        console.log("newEvent was previously true, now resetting")
        res.send("new event"); 
        newEvent = false;   
        return;
    }
    res.send("nothing new")
    return;
})


// this endpoint gets triggered on calendar change.
// listen to new events -> get event information -> Send event information to Ionic
app.post('/calendarEventPOST', async (req, res) => {
    // get latest calendar event.
    newEvent = true;
    // const geolocation = await fetchEvent.getGeocodedLatestEventLocation();
    // console.log(geolocation);
    res.send("Calendar event received.")
    // TODO send data to somewhere
})
 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port", port))