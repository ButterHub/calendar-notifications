const express = require('express')
const { google } = require('googleapis')
const app = express()
const port = 3000

// add user to watched users (need their token), create watch for token
app.post('/user', (req, res) => {
    res.send('To implement adding a user.')
})

app.get('/user', (req, res) => {
    res.send("User endpoint")
    // send back all users stored
})

// listen to new events -> get event information -> Send event information to Ionic
app.post('/event', (req, res) => {
    res.send("Success");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))