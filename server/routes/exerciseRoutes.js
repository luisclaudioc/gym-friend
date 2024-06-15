const express = require('express');
const router = express.Router();
const exerciseCtr = require('../controllers/exerciseController');

router.post('/exercises', exerciseCtr.newExercises);
router.get('/exercises', exerciseCtr.getAllExercises);
router.put('/exercises/:id', exerciseCtr.editExercise);
router.delete('/exercises/:id', exerciseCtr.deleteExercise);
router.delete('/exercises/delete/all', exerciseCtr.deleteAllExercises);

module.exports = router;