const db = require('./dbPool')
const bcrypt = require('bcrypt')

async function verifiySession(username, jwt) {
  try {


    const session = await db.execute('SELECT * FROM user_session WHERE jwt = ? AND user_id = ?', [jwt], user_ID)
    if (session) {
      
    }
  }
  catch (err) {
    console.log(err)
  }
}



async function createSession(username, jwt) {
  try {
      const userData = await getUserByUsername(username);

      if (userData) {
          const userID = userData.id; 

          const sessionResult =  await db.execute('INSERT INTO user_session (jwt, user_id) VALUES (?, ?);', [jwt, userID]);

          if (sessionResult) {
              return { success: true, sessionID: sessionResult.insertId };
          } else {
              return { success: false, message: 'Failed to create session' };
          }
      } else {
          return { success: false, message: 'User not found' };
      }
  } catch (error) {
      return { success: false, message: 'Error creating session' };
  }
}


async function createUser(userData, imagePth) {
    const { username, password, email, phoneNumber, birthDate} = userData;
    console.log(userData)
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const [rows] = await db.execute(
          'INSERT INTO user (username, password, email, phone, birth_date, image) VALUES (?, ?, ?, ?, ?, ?)',
          [username, hashedPassword, email, phoneNumber, birthDate, imagePth]
      );
        console.log('rows here:')
        console.log(rows)
      return rows
    }
    catch (err) {
      console.log(err)
    }
}

async function changeUserImage(userID, imagePth) {
  console.log(userID, imagePth)
  const [rows] = await db.execute(
      'UPDATE user SET image=? WHERE id=?',
      [imagePth, userID]
  );

  console.log(rows)
  return rows
}

async function verifyLogin(username, password) {
  try {
    const [rows] = await db.execute('SELECT id, password FROM user WHERE username = ?', [username]);
    console.log(rows);
    if (rows[0] !== undefined) {
      const dbPassword = rows[0].password;
      const passwordMatch = await bcrypt.compare(password, dbPassword);
      if (passwordMatch) {
        console.log("success")
        return rows[0].id
      }
    }
  } catch (err) {
    throw err
  }
};

async function getUserByUsername(username) {
  const [rows] = await db.execute(
    'SELECT * FROM user WHERE username=?',
    [username]
);

console.log(rows)
return rows
}

module.exports = {
  createUser,
  verifyLogin,
  changeUserImage,
  getUserByUsername,
};