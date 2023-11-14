import admin from 'firebase-admin'
import { BUCKET_URL } from './consts'

try {
  admin.initializeApp({
      //@ts-ignore
    credential: admin.credential.cert({
      //@ts-ignore
      "type": "service_account",
      "project_id": process.env.GOOGLECLOUD_PROJECT_ID ? process.env.GOOGLECLOUD_PROJECT_ID : undefined,
      "private_key_id": process.env.GOOGLECLOUD_PRIVATE_KEY_ID ? process.env.GOOGLECLOUD_PRIVATE_KEY_ID : undefined,
      "private_key": process.env.GOOGLECLOUD_PRIVATE_KEY 
      ? Buffer.from(process.env.GOOGLECLOUD_PRIVATE_KEY, "base64").toString().replace(/\\n/gm, "\n")
      : undefined,
      "client_email": process.env.GOOGLECLOUD_CLIENT_EMAIL ? process.env.GOOGLECLOUD_CLIENT_EMAIL : undefined,
      "client_id": "114240866990063054491",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5a4mx%40soundriser-3d7b2.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
}),
    storageBucket: BUCKET_URL
  })
  console.log('Firebase Initialized.')
} catch (error:any) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack)
  }
}

export default admin

