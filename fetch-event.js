/**
 * @license
 * Copyright Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START calendar_quickstart]
const fs = require('fs');
const GoogleMapsAPI = require('googlemaps')
const readline = require('readline');
const {google} = require('googleapis');
require('dotenv').config()

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
const API_KEY = process.env.api_key

const getLatestEventLocation = async (credentials) => {
  const auth = await authorize(JSON.parse(credentials))
  // console.log(auth)
  try {
    const events = await getEvents(auth, 1);
    return events[0].location
  } catch (err) {
    return console.log('The API returned an error: ' + err);
  }
}
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed// credentials.web or credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  let token;
  try {
    token = await fs.readFileSync(TOKEN_PATH);
  } catch (e) {
    console.log("Token did not exist, get one from Google.")
    return await getAccessToken(oAuth2Client); // returns nothing
  }
  oAuth2Client.setCredentials(JSON.parse(token));; // returns nothing
  return oAuth2Client;
  }

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
async function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((res, rej) => {
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
          res();
        });
      });
  });
  });
}

/**
 * Lists the next events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function getEvents(auth, size) {
    const calendar = google.calendar({version: 'v3', auth});
    return new Promise((resolve, reject) => {
      calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: size,
        singleEvents: true,
        orderBy: 'startTime',
      }, (err, res) => {
          if (err) return reject(err)
          resolve(res.data.items);
      });
    })
}

const geocode = async (location) => {
  const publicConfig = {
    key: API_KEY,
    stagger_time:       1000, // for elevationPath
    encode_polylines:   false,
    secure:             true, // use https
  };
  const gmAPI = new GoogleMapsAPI(publicConfig);

  var geocodeParams = {
    "address":    location
  };

  return new Promise((res, rej) => {
    gmAPI.geocode(geocodeParams, function(err, result){
      if (err) return rej(err)
      return res(result)
    });
  })
}

const main = async () => {
  const location = await getLatestEventLocation(fs.readFileSync('credentials.json'));
  if (!location) {
    console.log("Location is empty.")
    return
  }
  console.log(location)
  const geolocation = await geocode(location);
  console.log(geolocation.results[0])
}

main();

module.exports = {
  SCOPES
};