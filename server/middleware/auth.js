'use strict'
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const User = require('../models/User');


module.exports = (app) => {

    // Start session
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(async (username, password, done) => {
        // Look for the user data
        try { 
            const user = await User.findOne({ username });
            if (!user) { 
                return done(null, false, { message: 'User not found.' }); 
            }
  
            // If the password isn't correct
            if (!await bcrypt.compare(password, user.password)) { 
                return done(null, false, {   
                    message: 'Invalid password.' 
                }); 
            }

            // If the user is properly authenticated
            return done(null, user);
        } catch(err) {
            console.log(err);
        }
    }));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.post('/login', passport.authenticate('local', { failureRedirect: '/', failureMessage: true }), (req, res) => {
        res.redirect('/profile?user=' + req.user._id);
    });

    app.post('/register', async (req, res) => {
        try {
            // Get user input
            const { firstname, lastname, username, password, picture } = req.body; 
            
            // If input is incomplete
            if (!(username && password && firstname && lastname)) {
                return res.status(400).send("Please fill all the required fields.");
            }
        
            // Validate if already registered
            const userRegistered = await User.findOne({ username });
            if (userRegistered) {
                return res.status(409).send("Username already in use. Choose a different one, or login if that is your username.");
            }
        
            // Encrypt user password
            const encryptedPassword = await bcrypt.hash(password, 10);
        
            // Create user in database
            const newUser = await User.create({
                firstname,
                lastname,
                username,
                password: encryptedPassword,
                picture
            });

            // Login and redirect
            req.login(newUser, (err) => {
                if (err) {
                    return console.log(err);
                }
                res.redirect('/profile?user=' + newUser._id); 
            });
        } catch (err) {
            console.log(err);
            res.status(500).send("Server error");
        }
    });

    app.get('/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) { 
                return next(err); 
            }
            res.redirect('/');
        });
    });

}