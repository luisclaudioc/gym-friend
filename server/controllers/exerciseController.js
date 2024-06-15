'use strict'
const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');


exports.getAllExercises = async (req, res) => {

    try {
        const userId = req.query.user;
        const exercises = await Exercise.find({ user_id: userId });
        res.json(exercises);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.newExercises = async (req, res) => {

    try {
        const user_id = req.query.user;
        const { day, group, exercise, sets, repetitions, weight, obs } = req.body;
        
        const newExercise = await Exercise.create({ user_id, day, group, exercise, sets, repetitions, weight, obs })
        
        res.status(201).json(newExercise);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.editExercise = async (req, res) => {

    try {
        
        const exercise_id = req.params.id;
        const { sets, repetitions, weight } = req.body;
        
        const editedExercise = await Exercise.findByIdAndUpdate(exercise_id, { sets, repetitions, weight }, { new: true });

        res.status(200).json(editedExercise);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.deleteExercise = async (req, res) => {

    try {
        const exercise_id = req.params.id;
        
        await Exercise.deleteOne({ _id: exercise_id });

        res.status(200).json({ message: "Exercise deleted successfuly" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.deleteAllExercises = async (req, res) => {

    try {
        const user_id = req.query.user;
        
        await Exercise.deleteMany({ user_id });

        res.status(200).json({ message: "Workout plan deleted successfuly" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}