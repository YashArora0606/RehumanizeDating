const {
  updateUserName,
  updateUserBio,
  updateUserAge,
  updateUserSchool,
  updateUserInterests,
  updateUserProfilePicture,
} = require('../database/queries')

const updateUserProfile = async (
  userID,
  name,
  bio,
  age,
  school,
  interests,
  profilePic,
) => {
  if (userID == undefined) {
    console.error('No User ID provided')
    return {
      userID: null,
      name: null,
      bio: null,
      age: null,
      school: null,
      interests: null,
      profilePic: null,
    }
  }

  if (name != undefined) {
    await updateUserName(userID, name)
  }
  if (bio != undefined) {
    await updateUserBio(userID, bio)
  }
  if (age != undefined) {
    await updateUserAge(userID, age)
  }
  if (school != undefined) {
    await updateUserSchool(userID, school)
  }
  if (interests != undefined) {
    await updateUserInterests(userID, interests)
  }
  if (profilePic != undefined) {
    await updateUserProfilePicture(userID, profilePic)
  }

  return {
    userID: userID,
    name: name,
    bio: bio,
    age: age,
    school: school,
    interests: interests,
    profilePic: profilePic,
  }
}

module.exports = {
  updateUserProfile,
}
