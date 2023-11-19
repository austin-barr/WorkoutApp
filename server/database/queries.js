const db = require('./dbPool')
const bcrypt = require('bcrypt')

async function getSession(jwt) {
  try {
    const userData = await getUserByUsername(username);

    if (userData) {
        const userId = userData.id; 

        const rows = await db.execute('SELECT * FROM user_session WHERE jwt=? AND user_id=?', [jwt, userId])
        const sessionID = rows[0].id

        if (sessionID) {
            return { success: true, sessionID: sessionID};
        } else {
            return { success: false, message: 'Failed to verify session' };
        }
    } else {
        return { success: false, message: 'User not found' };
    }
  } catch (error) {
      return { success: false, message: 'Error verifying session' };
  }
}

async function createSession(userId, jwt) {
  console.log("userId: " + userId)
  try {
      if (userId) {
          console.log(userId)
          console.log(jwt)

          const sessionResult =  await db.execute('INSERT INTO user_session (jwt, user_id) VALUES (?, ?);', [jwt, userId]);
          console.log(sessionResult)

          if (sessionResult) {
              return { success: true, sessionID: sessionResult.insertId };
          } else {
              return { success: false, message: 'Failed to create session' };
          }
      } else {
          return { success: false, message: 'User not found' };
      }
  } catch (error) {
      throw error;
  }
}

async function removeSession(jwt) {
  console.log(jwt)
  try {
      const sessionResult =  await db.execute('DELETE FROM user_session WHERE jwt=?;', [jwt]);
      console.log("delete result:")
      console.log(sessionResult)

      if (sessionResult) {
          return { success: true, result: sessionResult };
      } else {
          return { success: false, message: 'Failed to remove session' };
      }
  } catch (error) {
      return { success: false, message: 'Error removing session' };
  }
}

async function createUser(userData, imagePth) {
    const { username, password, email, phoneNumber, birthDate, curWeight } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const [rows] = await db.execute(
          'CALL add_user_with_weight(?,?,?,?,?,?,?,@user_id)',
          [username, hashedPassword, email, phoneNumber, birthDate, imagePth, curWeight]
      );
        console.log('rows here:')
        console.log(rows)
        const user_id = rows[0][0].user_id;
        console.log(user_id)
      return user_id
    }
    catch (err) {
      console.log(err)
    }
}

async function changeUserImage(userId, imagePth) {
  console.log(userId, imagePth)
  const [rows] = await db.execute(
      'UPDATE user SET image=? WHERE id=?',
      [imagePth, userId]
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
        console.log("login success")
        return rows[0].id
      }
    }
  } catch (err) {
    throw err
  }
};

async function getUserByUsername(username) {
  console.log(username)
  try {
    const [rows] = await db.execute(
      'SELECT * FROM user WHERE username=?',
      [username]
    );
      console.log("rows:")
    console.log(rows)
    return rows[0]
  }
  catch (err) {
    throw err
  }
};

async function logWeight(userId, date, weight) {
  console.log(userId)
  console.log(date)
  console.log(weight)
  try {
    const existingRows = await db.execute(
      'SELECT * FROM user_weights WHERE user_id=? AND date=?',
      [userId, date]
    );
    console.log(existingRows)
    console.log(existingRows[0].length)
    if (existingRows[0].length == 0) {
      console.log('insert')
      const insertResult = await db.execute(
        'INSERT INTO user_weights (user_id, date, weight) VALUES (?, ?, ?)',
        [userId, date, weight]
      );
      console.log(insertResult)
      if (insertResult) {
        return insertResult.insertId
      }
      else {
        return {success: false, message: "failed to insert weight"}
      }
    }
    else {
      // ask to confirm overwrite??
      const updateResult = await db.execute(
        'UPDATE user_weights SET weight=? WHERE user_id=? AND date=?',
        [weight, userId, date]
      )
      console.log(updateResult)
      if (updateResult) {
        return updateResult[0].insertId
      }
      else {
        return {success: false, message: "failed to update weight"}
      }
    }
  }
  catch (err) {
    throw err
  }
};

async function getRecentWeight(userId, date) {
  console.log('recent weight')
  console.log(userId)
  console.log(date)
  try {
    console.log('try')
    const [rows] = await db.execute(
      'CALL get_recent_weight(?, ?)',
      [userId, date]
    );
    console.log("rows:")
    console.log(rows)
    return rows[0]
  }
  catch (err) {
    throw err
  }
};

async function getWeights(userId, startDate, endDate) {
  console.log(userId)
  console.log(startDate)
  console.log(endDate)
  try {
    const [rows] = await db.execute(
      'SELECT DATE_FORMAT(date, \'%Y-%m-%d\') AS date, weight FROM user_weights WHERE user_id=? AND date>=? AND date<=? ORDER BY date',
      [userId, startDate, endDate]
    );
    console.log("rows:")
    console.log(rows)
    return rows
  }
  catch (err) {
    throw err
  }
};

async function getDurations(userId, startDate, endDate) {
  console.log(userId)
  console.log(startDate)
  console.log(endDate)
  try {
    const [rows] = await db.execute(
      'CALL get_workout_duration_by_day(?,?,?)',
      [userId, startDate, endDate]
    );
    console.log("rows:")
    console.log(rows[0])
    return rows[0]
  }
  catch (err) {
    throw err
  }
};

module.exports = {
  createUser,
  verifyLogin,
  changeUserImage,
  getUserByUsername,
  getSession,
  createSession,
  removeSession,
  logWeight,
  getWeights,
  getDurations,
  getRecentWeight,
};