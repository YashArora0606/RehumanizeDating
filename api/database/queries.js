import pool from './index'

export const getUserProfile = async (userID) => {
  const query = `
        SELECT * 
            FROM users
            WHERE ID = $1
            LEFT JOIN availabilities
            ON users.ID = availabilities.userID; 
        `
  // Should also return the calls but i'm not sure how it works
  const result = await pool.query(query, [arg1, arg2])
  return result ? result.rows[0] : null
}
