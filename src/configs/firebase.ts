import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

// Don't worry about this config, it's just created for dev testing
const firebaseConfig = {
  apiKey: 'AIzaSyAVMmt14Z4PfkXLFj2Dmr16eF_8hDsTpzM',
  authDomain: 'arent-fe.firebaseapp.com',
  projectId: 'arent-fe',
  storageBucket: 'arent-fe.firebasestorage.app',
  messagingSenderId: '940899668157',
  appId: '1:940899668157:web:3cede4feecfc7e5538e7d4',
  measurementId: 'G-P8Z5E7ZK8F',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const analytics = getAnalytics(app)
const provider = new GoogleAuthProvider()

export { auth, analytics, provider }
