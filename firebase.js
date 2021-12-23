const GOOGLE_APPLICATION_CREDENTIALS = "/home/user/Desktop/soogroo-36c95-firebase-adminsdk-qj30o-8554dfd5d8.json"
var admin = require('firebase-admin');
var groups = require('./groups')

var serviceAccount = {
  "type": "service_account",
  "project_id": "soogroo-36c95",
  "private_key_id": "5391e8de19ba69f9637720ab149aea17a8b613dd",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCdqn425mGN+Syj\nYRCC9lbi4qQiAdwrVrHx1idxQqJNzsvRTYr7em5/JnKSTaECAz/6XOQGwibxJnu8\nzfbNLok7NYb21c4k5QT5zfzLn30I4B7tscbcYMy3HKy8DTkZ/dD/TabmDxyxWXxW\n/iA1vXCGhBRYRFpwRceGJ1NfnJr5lYS6d69kPj0Lt5ai8ZuoCcZYiNUA1V49qcWl\n6qGqnPofGw8RTWh36jeMidzw5bEI6jRzUf3LvzMW/h8G1T1BTg7TTPd3WmhFdrJW\nJrXXuLZT350+yIlQrL3gli8y5y9+kT9QpmgUmGLR/TFAsLxqElN5sGU/M4fwJDFV\n90EurbLFAgMBAAECgf8nV7Mm/+g/l23nh6x4n//FPFsaIVCAEkzCsI8zQCpYWHjY\n7Em78Nc0FAiPF+hMSQlq488/r7kH7clIBH6v5UhM/ghH/X/OnKyzeEuWa6mpMeJV\nGHtD5DkYzZsoRZIky71tfa/xGfjYF6cBlEOmGR97HDEcBjuXQmSZraQynzC3a+RW\nR/uw2gPCgvD2b8kUnCqm/vbFEmnsSPCPxrmd51v1Lr6UsO2IoZ/GKdMDyvlpfjqn\n9Zla7kKrvn+H38GG/A4GOBrY0nXRSHUkx1+P5O3xnBlNoOsA09pnKzknsdYC0imT\nxGXyi5HHILgMsCCE7DWyguUJzjc7Krgl2T/6CVsCgYEA0v8NbaYTyeH1Xh/ZggQf\ndCz+AK+Gm5fdgZLBqBS9O6mMRDi/38j3dWSaGFGTh4b3JL0RtKQL0j3LE6JLcxHt\neagor/TC1S2UQSR3knqsLeS7lEvf1bsCqRWgFJBbEdWrJcc+JoTUzvPFVDCiqdhg\n/h3G4qa2NRdgqruSbcE2Q98CgYEAv0t3eg4F2G34qRxX/QrPeRkMUcYMSIk8W2YR\nyPhmL2nwvLfkhKI2KD9/QrcutheYtZ1CmlVhhoMdwd7lYntp5Aqm9Uh9iRZuvt6t\n7NnUdmG4hYdSrjCvVQmoHt787thcAZ0neM5MDLSXAXf0LNYxUn4joZkF5RE+POvk\nhR+avdsCgYAJCyePMJQejhHPQ/w1p2mVuCv26Y8ScjLrT9f/FUx7FyxM7EXFGL8K\niBJWwoBZSb6kE3qDzJg5Ha7rm4QyXW1ZTozX5dzH+FknZaG+ZIWmvewQUiQ46/gU\nOToQR5OvswHP77dJPV5FtIsbra37K6wUmEAjDNQ4eFULXFjNXX+u7wKBgDUCg7RW\nCHamWt76FMPxZ/cF4u0SNbswFIK7cThA5YhEEksppnC+xsU2e1yQiKg7N700PA2q\nlWECGo/r5aL50ik4bnXQRcFkbwIDkSzuXDsF721JR7cvlJa7G1SatHq3iB+GXjbS\n7C4lKSdmB0sZfAeBHvyb/A8zTQzyzZu6W1Y7AoGAf4UetgqN8/lXpimh7x1oekxe\npZjsP8ClHBpMnu9vHHdfMQcUxwP5Fyf4sFQTrJOWLeV66fUV+wAhNA06peqFTx72\np+0OdcHjOFfsYIXYvX86Y+CDGMSK9s+J+m8hG0zuNt+ekCufFxQK41mhwKaMspmU\n6NQOaNgtXbbWAn/phFs=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-qj30o@soogroo-36c95.iam.gserviceaccount.com",
  "client_id": "101840400967150030493",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qj30o%40soogroo-36c95.iam.gserviceaccount.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://soogroo-36c95-default-rtdb.europe-west1.firebasedatabase.app"
});

// firebase functions

exports.subscribe = (user, token) => {

  groups.getAllGroups(user).then(groups => {
    groups.map((group) => {
      ['event-created', 'event-updated', 'new-message'].forEach(topic => {
        console.log(group._id)
        console.log(token)
        console.log(topic)
        admin.messaging().subscribeToTopic(token, 'group~' + group._id + '~' + topic)
          .then((response) => {
            // See the MessagingTopicManagementResponse reference documentation
            // for the contents of response.
            console.log('Successfully subscribed to topic:', response);
          })
          .catch((error) => {
            console.log('Error subscribing to topic:', error);
          });
      })
    })
  })
}

exports.unSubscribe = (user, token) => {

  groups.getAllGroups(user).then(groups => {
    groups.map((group) => {
      ['event-created', 'event-updated', 'new-message'].forEach(topic => {
        console.log(group._id)
        console.log(token)
        console.log(topic)
        admin.messaging().unsubscribeFromTopic(token, 'group~' + group._id + '~' + topic)
          .then((response) => {
            // See the MessagingTopicManagementResponse reference documentation
            // for the contents of response.
            console.log('Successfully unsubscribed from topic:', response);
          })
          .catch((error) => {
            console.log('Error unsubscribing from topic:', error);
          });
      })
    })
  })
}


exports.publish = (message) => {
  //TODO:  add to notifications collection
  admin.messaging().send(message)
}