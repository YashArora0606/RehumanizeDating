const DEVELOPMENT_CONFIG = {
  BACKEND_ADDRESS: 'http://localhost:3000',
  FRONTEND_ADDRESS: 'http://localhost:3001',
}

const PRODUCTION_CONFIG = {
  BACKEND_ADDRESS: process.env.BACKEND_ADDRESS,
  FRONTEND_ADDRESS: process.env.FRONTEND_ADDRESS,
}

export default process.env.NODE_ENV === 'development'
  ? DEVELOPMENT_CONFIG
  : PRODUCTION_CONFIG

export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_REHUMANIZE_API_KEY,
  authDomain: process.env.REACT_APP_REHUMANIZE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_REHUMANIZE_DATABASE_URL,
  projectId: process.env.REACT_APP_REHUMANIZE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_REHUMANIZE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_REHUMANIZE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_REHUMANIZE_APP_ID,
}
