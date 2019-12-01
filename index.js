const { google } = require('googleapis')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Watch. Listen. Repeat.")
})

app.post('/', (req, res) => {
    // listen to new events -> get event information -> Send event information to Ionic
    console.log({req})
    res.send("Posted an event? This still needs to be implemented")
    // need to get a request of event contents?
})

const port = process.env.PORT
app.listen(process.env.port || port, () => console.log("Listening on port", port))