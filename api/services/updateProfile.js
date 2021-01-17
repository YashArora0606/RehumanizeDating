const {
  updateUserName,
  updateUserGender,
  updateUserGenderPreference,
  updateUserBio,
  updateUserAge,
  updateUserSchool,
  updateUserInterests,
  updateUserProfilePicture,
} = require('../database/queries')

const updateUserProfile = async ({
  userID,
  name,
  gender,
  genderPreference,
  bio,
  age,
  school,
  interests,
  profilePic,
}) => {
  if (userID === undefined) {
    console.error('No User ID provided')
    return {
      userID: null,
      name: null,
      gender: null,
      genderPreference: null,
      bio: null,
      age: null,
      school: null,
      interests: null,
      profilePic: null,
    }
  }

  if (name !== undefined) {
    await updateUserName(userID, name)
  }
  if (gender !== undefined) {
    await updateUserGender(userID, gender)
  }
  if (genderPreference !== undefined) {
    await updateUserGenderPreference(userID, genderPreference)
  }
  if (bio !== undefined) {
    await updateUserBio(userID, bio)
  }
  if (age !== undefined) {
    await updateUserAge(userID, age)
  }
  if (school !== undefined) {
    await updateUserSchool(userID, school)
  }
  if (interests !== undefined) {
    await updateUserInterests(userID, interests)
  }
  if (profilePic !== undefined) {
    await updateUserProfilePicture(userID, profilePic)
  }

  return {
    userID: userID,
    name: name,
    gender: gender,
    genderPreference: genderPreference,
    bio: bio,
    age: age,
    school: school,
    interests: interests,
    profilePic: profilePic,
  }
}

//updateUserProfile('2241f73b-7b79-46c7-99cb-a9c1bf8a558b', 'Armanya', '19')

module.exports = {
  updateUserProfile,
}
