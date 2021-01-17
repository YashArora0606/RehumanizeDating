const async = require('async')
const fs = require('fs')
const path = require('path')

const pg = require('pg')

// Connect to the database.
const config = {
  user: 'armanya',
  password: 'temppassword',
  host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
  database: 'mature-lynx-290.defaultdb',
  port: 26257,
  ssl: {
    ca: fs.readFileSync(path.join(__dirname,'/cc-ca.crt')).toString(),
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
          'CREATE TABLE IF NOT EXISTS users (ID UUID PRIMARY KEY DEFAULT gen_random_uuid(), Name STRING, Age INT, School STRING, Interests STRING[], ProfilePicture STRING);',
          next,
        )
      },
      function (results, next) {
        // Create the 'swipes' table.
        client.query(
          'CREATE TABLE IF NOT EXISTS swipes (ID UUID PRIMARY KEY DEFAULT gen_random_uuid(), Swiper UUID REFERENCES users(ID) ON UPDATE CASCADE ON DELETE CASCADE, Swipee UUID REFERENCES users(ID) ON UPDATE CASCADE ON DELETE CASCADE, Interested BOOL, Scheduled BOOL);',
          next,
        );
      },
      function (results, next) {
        // Create the 'availabilities' table.
        client.query(
          'CREATE TABLE IF NOT EXISTS availabilities (ID UUID PRIMARY KEY DEFAULT gen_random_uuid(), UserID UUID REFERENCES users(ID), Sunday JSONB, Monday JSONB, Tuesday JSONB, Wednesday JSONB, Thursday JSONB, Friday JSONB, Saturday JSONB);',
          next,
        );
      },
      function (results, next) {
        // Create the 'calls' table.
        client.query(
          'CREATE TABLE IF NOT EXISTS calls (ID UUID PRIMARY KEY DEFAULT gen_random_uuid(), Complete BOOL, UserID UUID REFERENCES users(ID), SessionID STRING, StartTime STRING, EndTime STRING);',
          next,
        );
      },
    ],
    function (err, results) {
      if (err) {
        console.error('Error creating tables: ', err);
        finish();
      }

      console.log('Finished creating database tables');
      console.log(results);
    });
});

module.exports = pool;
