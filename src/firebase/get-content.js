import firebase from 'firebase'

// Setup Firebase
const config = {
  apiKey: 'AIzaSyDCwS0q7rJ5ODNe8IU2apk-LFYomOJkLKU',
  authDomain: 'flamelink-test-7800f.firebaseapp.com',
  databaseURL: 'https://flamelink-test-7800f.firebaseio.com',
  projectId: 'flamelink-test-7800f',
  storageBucket: 'flamelink-test-7800f.appspot.com',
  messagingSenderId: '60765443920'
}
const content = firebase.initializeApp(config)

export const db = content.database()

export const storage = firebase.storage()
