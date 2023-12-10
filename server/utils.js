const express = require('express')
const { changeUserImage, getUserByUsername, removeSession, getSession, logWeight, getWeights, getDurations, getRecentWeight, getExercises, addWorkout, getWorkouts, updateWorkout, test } = require('./database/queries')
const router = express.Router();
const multer = require('multer');
const {verifyJwt} = require('./verifyJwt')

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
        res.status(200).json({rows: result})
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
router.post('/upload/user', verifyJwt, upload.single('file'), async (req, res) => {
    const result = await changeUserImage(req.body.userId, req.file.filename)
    // need response, try, errors, etc
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
            res.status(500).json({error: "Internal server error"})
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
        const prevWeight = recentResult.rows !== undefined ? [recentResult.rows[0].weight] : []
        if (result) {
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

router.get('/get/exercises', verifyJwt, async (req, res) => {
    try {
        rows = await getExercises()
        if (rows) {
            const min = Math.min(...rows.map((row) => row.id))
            let exercises = []
            let seen = []
            for (let row of rows) {
                if (!(seen.includes(row.id))) {
                    seen.push(row.id)
                    exercises[row.id-min] = {
                        id: row.id,
                        name: row.name,
                        description: row.description,
                        duration: row.duration_per_rep,
                        muscleGroups: []
                    }
                }
                exercises[row.id-min].muscleGroups.push(row.muscle_group)
            }
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

router.get('/get/workouts', verifyJwt, async (req, res) => {
    const userId = req.userId
    try {
        let rows = (await getWorkouts(userId))[0];
        
        let i = -1;
        if (rows) {
            let workouts = []
            let seen = []
            for (let row of rows) {
                if (!(seen.includes(row.workout_id))) {
                    i++;
                    seen.push(row.workout_id)
                    workouts[i] = {
                        name: row.workout_name,
                        exercises: []
                    }
                }
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
            // console.log(workouts.exercises)
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

router.post('/update/workout', verifyJwt, async (req, res) => {
    console.log('update workout')
    console.log(req.body.exercises[0])
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