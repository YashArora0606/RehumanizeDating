const async = require('async')
const fs = require('fs')
const { Pool } = require('pg')

// Connect to the database.
const config = {
  user: 'armanya',
  password: 'temppassword',
  host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
  database: 'mature-lynx-290.defaultdb',
  port: 26257,
  ssl: {
    ca: fs.readFileSync('cc-ca.crt').toString(),
  },
}

// Create a pool.
const pool = new pg.Pool(config)

pool.connect(function (err, client, done) {
  const finish = function () {
    done()
    process.exit()
  }
  if (err) {
    console.error('could not connect to cockroachdb', err)
    finish()
  }

  async.waterfall(
    [
      function (next) {
        // Create the 'users' table.
        client.query(
          'CREATE TABLE IF NOT EXISTS users (ID INT PRIMARY KEY, Name VARCHAR NOT NULL, School VARCHAR NOT NULL, Interests );',
          next,
        )
      },
      function (results, next) {
        // Insert two rows into the 'accounts' table.
        client.query(
          'INSERT INTO accounts (id, balance) VALUES (1, 1000), (2, 250);',
          next,
        )
      },
      function (results, next) {
        // Print out account balances.
        client.query('SELECT id, balance FROM accounts;', next)
      },
    ],
    function (err, results) {
      if (err) {
        console.error('Error inserting into and selecting from accounts: ', err)
        finish()
      }

      console.log('Initial balances:')
      results.rows.forEach(function (row) {
        console.log(row)
      })

      finish()
    },
  )
})

export default pool
