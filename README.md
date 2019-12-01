# 
- Delete token, and recreate it, as it expires! (todo how long does it last?)
- Remember to [decode](https://urldecode.org/) the url output

## Notes
- there are 2 'apps' in this repo
  - Index.js: An express server deployed to cloud run, which 'watch's accounts using google calendar push notifications
  - Fetch-event.js: A poll to gcal api, retrieving events location, and geocodes it.

# CLOUD Run set up
## Notes on GCP
- Package application into container image
- Uploaded to container registry `gcloud builds submit --tag gcr.io/ford-hack-99744/cape`
- deploy cloud run container `gcloud run deploy --image gcr.io/ford-hack-99744/cape --platform managed`
## Watch (sub)
- currently run manually using postman and token generator (`fetch-event.js`)
## Listener
- gcloud functions deploy calendarEventPOST --runtime nodejs10 --trigger-http --region=europe-west2