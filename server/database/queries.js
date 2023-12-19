const db = require('./dbPool')
const bcrypt = require('bcrypt')

async function getSession(jwt) {
  try {
      const rows = await db.query('SELECT * FROM user_session WHERE jwt=?', [jwt])
      const sessionId = rows[0].id

      if (sessionId) {
          return { success: true, sessionId: sessionId};
      } else {
          return { success: false, message: 'Failed to verify session' };
      }
  } catch (error) {
      return { success: false, message: 'Error verifying session' };
  }
}

async function createSession(userId, jwt) {
  try {
      if (userId) {

          const sessionResult =  await db.query('INSERT INTO user_session (jwt, user_id) VALUES (?, ?);', [jwt, userId]);

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
  try {
      const sessionResult =  await db.query('DELETE FROM user_session WHERE jwt=?;', [jwt]);

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
    const { username, password, email, phoneNumber, birthDate, curWeight, curDate } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const [rows] = await db.query(
          'CALL add_user_with_weight(?,?,?,?,?,?,?,?,@user_id); SELECT @user_id;',
          [username, hashedPassword, email, phoneNumber, birthDate, imagePth, curWeight, curDate]
      );
      const user_id = rows[1][0]['@user_id'];
      return user_id
    }
    catch (err) {
      throw err
    }
}

async function changeUserImage(userId, imagePth) {
  const [rows] = await db.query(
      'UPDATE user SET image=? WHERE id=?',
      [imagePth, userId]
  );

  return rows
  // need error handling
}

async function verifyLogin(username, password) {
  try {
    const [rows] = await db.query('SELECT id, password FROM user WHERE username = ?', [username]);
    if (rows[0] !== undefined) {
      const dbPassword = rows[0].password;
      const passwordMatch = await bcrypt.compare(password, dbPassword);
      if (passwordMatch) {
        return rows[0].id
      }
    }
  } catch (err) {
    throw err
  }
};

async function getUserByUsername(username) {
  try {
    const [rows] = await db.query(
      'SELECT * FROM user WHERE username=?',
      [username]
    );
    return rows[0]
  }
  catch (err) {
    throw err
  }
};
async function getUsername(userID) {
  
  try {
    const [rows] = await db.query(
      'SELECT username FROM user WHERE id=?',
      [userID]
    );
      console.log("rows:")
    console.log(rows)
    return rows[0]
  }
  catch (err) {
    throw err
  }
};
async function getUserImage(userId) {
  console.log("break")
  console.log(userId)
  try {
    const [rows] = await db.query(
      "SELECT image FROM user WHERE id=?" ,
      [userId]
    );
      console.log("rows:")
    console.log(rows)
    return rows[0]
  }
  catch (err) {
    console.log(err)
  }
}

async function logWeight(userId, date, weight) {
  try {
    const existingRows = await db.query(
      'SELECT * FROM user_weights WHERE user_id=? AND date=?',
      [userId, date]
    );
    if (existingRows[0].length == 0) {
      const insertResult = await db.query(
        'INSERT INTO user_weights (user_id, date, weight) VALUES (?, ?, ?)',
        [userId, date, weight]
      );
      if (insertResult) {
        return insertResult[0].insertId
      }
    }
    else {
      // ask to confirm overwrite??
      const updateResult = await db.query(
        'UPDATE user_weights SET weight=? WHERE user_id=? AND date=?',
        [weight, userId, date]
      )
      if (updateResult) {
        return updateResult[0].insertId
      }
    }
  }
  catch (err) {
    throw err
  }
};

async function getRecentWeight(userId, date) {
  try {
    const [rows] = await db.query(
      'CALL get_recent_weight(?, ?)',
      [userId, date]
    );
    return rows[0]
  }
  catch (err) {
    throw err
  }
};

async function getWeights(userId, startDate, endDate) {
  try {
    const [rows] = await db.query(
      'SELECT DATE_FORMAT(date, \'%Y-%m-%d\') AS date, weight FROM user_weights WHERE user_id=? AND date>=? AND date<=? ORDER BY date',
      [userId, startDate, endDate]
    );
    return rows
  }
  catch (err) {
    throw err
  }
};

async function getDurations(userId, startDate, endDate) {
  try {
    const [rows] = await db.query(
      'CALL get_log_duration_by_day(?,?,?)',
      [userId, startDate, endDate]
    );
    return rows[0]
  }
  catch (err) {
    throw err
  }
};

async function getExercises() {
  try {
    const [rows] = await db.query(
      'CALL get_exercises_with_muscles()'
    );
    return rows[0]
  }
  catch (err) {
    throw err
  }
};

async function getWorkouts(userId) {
  try {
    const [rows] = await db.query(
      'CALL get_workout_summaries(?)',
      [userId]
    );
      return rows
  }
  catch (err) {
    throw err
  }
};

async function getLogs(userId, startDate, endDate) {
  try {
    const [rows] = await db.query(
      'CALL get_logs(?,?,?)',
      [userId, startDate, endDate]
    );
      return rows
  }
  catch (err) {
    throw err
  }
};

async function addWorkout(userId, workoutName, exerciseList) {
  try {
    const [rows] = await db.query(
      'CALL add_workout(?,?,?)',
      [userId, workoutName, JSON.stringify(exerciseList)]
    );
    return rows
  }
  catch (err) {
    throw err
  }
};

async function addLog(userId, workoutName, date, startTime, endTime, exerciseList) {
  try {
    const [rows] = await db.query(
      'CALL log_workout(?,?,?,?,?,?)',
      [userId, workoutName, date, startTime, endTime, JSON.stringify(exerciseList)]
    );
    return rows
  }
  catch (err) {
    throw err
  }
};

async function updateWorkout(userId, workoutId, workoutName, exerciseList) {
  try {
    const [rows] = await db.query(
      'CALL update_workout(?,?,?,?)',
      [userId, workoutId, workoutName, JSON.stringify(exerciseList)]
    );
    return rows
  }
  catch (err) {
    throw err
  }
};

async function updateLog(userId, workoutId, workoutName, date, startTime, endTime, exerciseList) {
  try {
    const [rows] = await db.query(
      'CALL update_log(?,?,?,?,?,?,?)',
      [userId, workoutId, workoutName, date, startTime, endTime, JSON.stringify(exerciseList)]
    );
    return rows
  }
  catch (err) {
    throw err
  }
};

async function test(n) {
  try {
    const result = await db.query(
      'CALL p(?, @n2); SELECT @n2;',
      [n]
    );
    console.log(result)
    const n2 = result[0][1][0]['@n2']
    console.log(n2)
    return n2
  }
  catch (err) {
    throw err
  }
}

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
  getExercises,
  getWorkouts,
  addWorkout,
  getUsername,
  getUserImage,
  updateWorkout,
  test,
  addLog,
  updateLog,
  getLogs,
};