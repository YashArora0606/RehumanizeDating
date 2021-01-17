const pool = require('./index');

const getUserProfile = async (userID) => {
    const query1 = `
            SELECT * 
                FROM users
                WHERE ID = $1
                LEFT JOIN availabilities
                ON users.ID = availabilities.userID; 
            `
    const result1 = await pool.query(query1, [userID]);

    const query2 = `
        SELECT *
            FROM calls
            WHERE userID = $1
    `
    const result2 = await pool.query(query2, [userID]);

    result = {...(result1.rows[0]), calls: result2.rows};

  return result ? result.rows[0] : null
}

const createUser = async () => {
  const query = `
        INSERT
            INTO users
            DEFAULT VALUES
            RETURNING ID;`
            
  const result = await pool.query(query, []);
  return result ? result.rows[0] : null;
}

 const updateUserName = async (userID, name) => {
  const query = `
      UPDATE users
      SET Name = $2
      WHERE ID = $1;`

  const result = await pool.query(query, [userID, name]);
}

 const updateUserAge = async (userID, age) => {
  const query = `
      UPDATE users
      SET Age = $2
      WHERE ID = $1;`

  const result = await pool.query(query, [userID, age]);
}

 const updateUserSchool = async (userID, school) => {
  const query = `
      UPDATE users
      SET School = $2
      WHERE ID = $1;`

  const result = await pool.query(query, [userID, school]);
}

 const updateUserInterests = async (userID, interests) => {
  const query = `
      UPDATE users
      SET Interests = $2
      WHERE ID = $1;`

  const result = await pool.query(query, [userID, interests]);
}

 const updateUserProfilePicture = async (userID, profilePic) => {
  const query = `
      UPDATE users
      SET ProfilePicture = $2
      WHERE ID = $1;`

  const result = await pool.query(query, [userID, profilePic]);
}

 const insertSwipe = async (swiper, swipee, interested, scheduled) => {
  const query = `
    INSERT INTO swipes (Swiper, Swipee, Interested, Scheduled)
    VALUES ($1, $2, $3, $4);
    `

const result = await pool.query(query, [swiper, swipee, interested, scheduled]);
}

 const getSwipedBy = async (swipee) => {
  const query = `
    SELECT * FROM swipes 
    WHERE swipee=$1;
    `
const result = await pool.query(query, [swipee]);
return result ? result.rows[0] : null;
}

 const getSwipedOn = async (swiper) => {
  const query = `
    SELECT * FROM swipes 
    WHERE swiper=$1;
    `
const result = await pool.query(query, [swiper]);
return result ? result.rows[0] : null;
}



//  const getCalls

module.exports = {
  getUserProfile,
  createUser,
  updateUserName,
  updateUserAge,
  updateUserInterests,
  updateUserProfilePicture,
  updateUserSchool,
  insertSwipe, 
  getSwipedBy,
  getSwipedOn
}
