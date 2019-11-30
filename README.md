# 
- Delete token, and recreate it, as it expires! (todo how long does it last?)
- Remember to [decode](https://urldecode.org/) the url output

# CLOUD Run set up
## Notes on GCP
- Package application into container image
- Uploaded to container registry
## Watch (sub)
- currently run manually using postman and token generator (`fetch-event.js`)
## Listener
- gcloud functions deploy calendarEventPOST --runtime nodejs10 --trigger-http --region=europe-west2