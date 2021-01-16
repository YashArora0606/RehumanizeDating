const DEV_CONFIG = {
  BACKEND_ADDRESS: 'localhost:3000',
  FRONTEND_ADDRESS: 'localhost:3001',
}

const PROD_CONFIG = {
  BACKEND_ADDRESS: process.env.BACKEND_ADDRESS,
  FRONTEND_ADDRESS: process.env.FRONTEND_ADDRESS,
}

module.exports =
  process.env.NODE_ENV === 'development' ? DEV_CONFIG : PROD_CONFIG
