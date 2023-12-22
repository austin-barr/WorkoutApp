const express = require('express')
const { getUsername, getUserImage, changeUserImage, getUserByUsername, removeSession, getMuscleGroups, addExercise, logWeight, getWeights, getDurations, getRecentWeight, getExercises, addWorkout, addLog, getWorkouts, updateWorkout, updateLog, getLogs, test, changePhonenumber, verifyLogin, changePassword, isAuthorized, isAdmin} = require('./database/queries')
const router = express.Router();
const multer = require('multer');
const {verifyJwt, verifyUserAuthorized } = require('./verification')

const storage = multer.diskStorage({
    destination: 'profileImages/',
    filename: function (req, file, cb) {
        const fileName = file.originalname;
        cb(null, fileName);
    },
});
  
const upload = multer({ storage });
router.post('/lookup/username',verifyJwt, async (req, res) => {
    console.log('post to lookup/username')
    console.log(req.userId)
    const result = await getUsername(req.userId);
    console.log("result here")
    console.log(result)
    if (result) {
        res.status(200).json({success: true})
    }
    else {
        res.json({"success":false})
    }
});
router.post('/get/profilepic', verifyJwt, async (req, res) => {
    console.log('get profile pic')
    console.log(req.userId)
    const result = await getUserImage(req.userId)
    console.log('result')
    if (result) {
        res.status(200).json({rows: result})
    }
    else {
        res.json({success: false})
    }
});
router.get('/get/isAuthorized', verifyJwt, async (req, res) => {
    try {
        const result = await isAuthorized(req.userId)
        if (result !== undefined) {
            res.status(200).json({result: result})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }

    catch (err) {
        res.status(500).json({error: "Internal server error"})
    }
    
});

router.get('/get/isAdmin', verifyJwt, async (req, res) => {
    try {
        const result = await isAdmin(req.userId)
        if (result !== undefined) {
            res.status(200).json({result: result})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }

    catch (err) {
        res.status(500).json({error: "Internal server error"})
    }
    
});

router.post('/phonenumber', verifyJwt, async (req, res) => {
    try {
        const result = await changePhonenumber(req.userId, req.body.PhoneNumber)
        if (result) {
            res.status(200)
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        res.status(500).json({error: "Internal server error"})
    }
    
});


router.post('/upload/user', verifyJwt, upload.single('file'), async (req, res) => {
    try {
        const result = await changeUserImage(req.body.userId, req.file.filename)
        if (result) {
            res.status(200)
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        res.status(500).json({error: "Internal server error"})
    }
    
});

router.post('/lookup/username', async (req, res) => {
    try {
        const result = await getUserByUsername(req.body.username);
        if (result) {
            res.status(200).json({result: result})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
});

router.post('/signout', verifyJwt, async (req, res) => {
    try {
        const result = await removeSession(req.cookies.token);
        if (result) {
            res.status(200).clearCookie('token').json({})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        res.status(500).json({error: "Internal server error"})
    }
});

router.post('/log/weight', verifyJwt, async (req, res) => {
    try {
        result = await logWeight(req.userId, req.body.date, req.body.weight)
        if (result !== undefined) {
            res.status(200).json({result: result})
        }
        else {
            console.log("inner result" + result);
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        res.status(500).json({error: "Internal server error"})
    }
});
router.post('/changePassword', verifyJwt, async (req, res) => {
    try {
        console.log("usernamePasscheck");
        console.log(req.body.password);
        console.log(req.userId);
        const userRes = await getUsername(req.userId)
        console.log(userRes.username)
        const userID = await verifyLogin(userRes.username, req.body.password);
        console.log("passVerify");
        console.log(userID)
        if(userID !== undefined){

            result = await changePassword(req.userId,  req.body.NewPassword)
            if (result !== undefined) {
                res.status(200).json({result: result})
            }
            else {
                res.status(500).json({error: "Internal server error"})
            }
        }
        else
        {
            res.status(401).json({error: "Incorrect Password"})

        }
    }
    catch (err) {
        res.status(500).json({error: "Internal server error"})
    }
});
router.post('/get/weights', verifyJwt, async (req, res) => {
    const userId = req.userId
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    try {
        const result = await getWeights(userId, startDate, endDate)
        const recentResult = await getRecentWeight(userId, startDate)
        console.log(recentResult)
        const prevWeight = (recentResult ? [recentResult[0].weight] : [])
        if (result || recentResult) {
            res.status(200).json({rows: result, prevWeight: prevWeight})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        res.status(500).json({error: "Internal server error"})
    }
});


router.post('/get/durations', verifyJwt, async (req, res) => {
    const userId = req.userId
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    try {
        result = await getDurations(userId, startDate, endDate)
        if (result) {
            res.status(200).json({rows: result})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
});

router.post('/get/recent-weight', verifyJwt, async (req, res) => {
    const userId = req.userId
    const date = req.body.date
    try {
        result = await getRecentWeight(userId, date)
        if (result) {
            res.status(200).json({rows: result})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        res.status(500).json({error: "Internal server error"})
    }
});
router.post('/add/exercise', verifyJwt, verifyUserAuthorized, async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const image = "./defaultImages/defaultExercise.png"
    const duration = req.body.duration;
    const muscleGroups = req.body.muscleGroups;

    try {
        const result = await addExercise(name, description, image, duration, muscleGroups)
        if (result) {
            res.status(200).json({rows: result})
        }
        else {
            console.log('here')
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
});

router.get('/get/exercises', verifyJwt, async (req, res) => {
    try {
        rows = await getExercises()
        // console.log(rows)
        let i = -1
        if (rows) {
            let exercises = []
            let seen = []
            for (let row of rows) {
                if (!(seen.includes(row.id))) {
                    i++
                    seen.push(row.id)
                    exercises[i] = {
                        id: row.id,
                        name: row.name,
                        description: row.description,
                        duration: row.duration_per_rep,
                        muscleGroups: []
                    }
                }
                exercises[i].muscleGroups.push(row.muscle_group)
            }
            // console.log(exercises)
            res.status(200).json({exercises: exercises})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        res.status(500).json({error: "Internal server error"})
    }
});

router.get('/get/muscleGroups', verifyJwt, async (req, res) => {
    try {
        const rows = await getMuscleGroups();
        if (rows) {
            res.status(200).json({rows: rows})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        res.status(500).json({error: "Internal server error"})
    }
})

router.get('/get/users', verifyJwt, async (req, res) => {

})

router.get('/get/workouts', verifyJwt, async (req, res) => {
    const userId = req.userId
    try {
        let rows = (await getWorkouts(userId))[0];
        console.log('workouts rows')
        console.log(rows)

        // const muscleTimes = (await getWorkoutMuscleTimes(userId))
        // get time spent using each muscle group, each workout could have
        // its top three groups or something
        
        let i = -1;
        if (rows) {
            let workouts = []
            let seen = []
            for (let row of rows) {
                if (!(seen.includes(row.workout_id))) {
                    i++;
                    seen.push(row.workout_id)
                    workouts[i] = {
                        id: row.workout_id,
                        name: row.workout_name,
                        exercises: [],
                        estimatedTime: 0
                    }
                }
                workouts[i].estimatedTime += Number(row.estimated_time)
                workouts[i].exercises.push({
                    id: row.exercise_id,
                    name: row.exercise_name,
                    weight: row.weight,
                    sets: row.sets,
                    reps: row.reps_per_set,
                    description: row.exercise_description,
                    duration: row.duration_per_rep,
                })
            }
            console.log(workouts)
            res.status(200).json({workouts: workouts})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
});

router.post('/get/logs', verifyJwt, async (req, res) => {
    const userId = req.userId
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    console.log(userId, startDate, endDate)
    try {
        let rows = (await getLogs(userId, startDate, endDate))[0];
        console.log(rows)
        
        let i = -1;
        if (rows) {
            let logs = []
            let seen = []
            for (let row of rows) {
                if (!(seen.includes(row.log_id))) {
                    i++;
                    seen.push(row.log_id)
                    logs[i] = {
                        id: row.log_id,
                        name: row.log_name,
                        date: row.date,
                        startTime: row.start_time,
                        endTime: row.end_time,
                        duration: row.duration,
                        exercises: [],
                        estimatedTime: 0
                    }
                }
                logs[i].estimatedTime += Number(row.estimated_time)
                console.log(logs)
                logs[i].exercises.push({
                    id: row.exercise_id,
                    name: row.exercise_name,
                    weight: row.weight,
                    sets: row.sets,
                    reps: row.reps_per_set,
                    description: row.exercise_description,
                    duration: row.duration_per_rep,
                })
            }
            // console.log(logs.exercises)
            res.status(200).json({logs: logs})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
});

router.post('/add/workout', verifyJwt, async (req, res) => {
    const userId = req.userId
    const workoutName = req.body.name
    const exerciseList = req.body.exercises[0].map((ex) => (
        {
            exercise_id: ex.id,
            step_number: ex.step,
            weight: ex.weight,
            sets: ex.sets,
            reps_per_set: ex.reps
        }
    ));
    try {
        result = await addWorkout(userId, workoutName, exerciseList)
        console.log("add workout result:")
        console.log(result)
        if (result !== undefined) {
            res.json({"result": result})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
});

router.post('/add/log', verifyJwt, async (req, res) => {
    const userId = req.userId
    const workoutName = req.body.name
    const date = req.body.date
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    const exerciseList = req.body.exercises[0].map((ex) => (
        {
            exercise_id: ex.id,
            step_number: ex.step,
            weight: ex.weight,
            sets: ex.sets,
            reps_per_set: ex.reps
        }
    ));
    try {
        result = await addLog(userId, workoutName, date, startTime, endTime, exerciseList)
        console.log("add log result:")
        console.log(result)
        if (result !== undefined) {
            res.json({"result": result})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
});

router.post('/update/log', verifyJwt, async (req, res) => {
    const userId = req.userId
    const workoutId = req.body.id
    const workoutName = req.body.name
    const date = req.body.date
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    const exerciseList = req.body.exercises[0].map((ex) => (
        {
            exercise_id: ex.id,
            step_number: ex.step,
            weight: ex.weight,
            sets: ex.sets,
            reps_per_set: ex.reps
        }
    ));
    try {
        result = await updateLog(userId, workoutId, workoutName, date, startTime, endTime, exerciseList)
        console.log("update log result:")
        console.log(result)
        if (result !== undefined) {
            res.json({"result": result})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
});

router.post('/update/workout', verifyJwt, async (req, res) => {
    console.log('update workout')
    console.log(req.body.id)
    const userId = req.userId
    const workoutId = req.body.id
    const workoutName = req.body.name
    const exerciseList = req.body.exercises[0].map((ex) => (
        {
            exercise_id: ex.id,
            step_number: ex.step,
            weight: ex.weight,
            sets: ex.sets,
            reps_per_set: ex.reps
        }
    ));
    console.log(exerciseList)
    try {
        result = await updateWorkout(userId, workoutId, workoutName, exerciseList)
        console.log("update workout result:")
        console.log(result)
        if (result !== undefined) {
            res.json({result: result})
        }
        else {
            res.status(500).json({error: "Internal server error"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
});

// router.post('/update/workout', verifyJwt, async (req, res) => {
//     const exerciseList = req.body
//     try {
//         result = await addWorkout(exerciseList)
//         console.log("result here")
//         console.log(result)
//         if (result) {
//             res.json({"result": result})
//         }
//         else {
//             res.json({"success":false})
//         }
//     }
//     catch (err) {
//         console.log(err)
//     }
// });

router.post('/test', async (req, res) => {
    const n = req.body.n
    try {
        const n2 = await test(n)
        res.status(200).json({n2: n2})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }
})

module.exports = router;