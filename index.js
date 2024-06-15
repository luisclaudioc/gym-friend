require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exerciseRoute = require('./server/routes/exerciseRoutes');
const auth = require('./server/middleware/auth');
const connectEnsureLogin = require('connect-ensure-login');

const app = express();
const portNum = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Authenticate session
auth(app);

// Allow access to client folder
app.use('/client', express.static(process.cwd() + '/client'));

// Conect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(console.log("Connected to DB"))
    .catch(err => console.error(err));

// Index page (static HTML)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/views/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/client/views/login.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/client/views/register.html');
});

app.get('/profile', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile(__dirname + '/client/views/profile.html');
});

app.get('/workout', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile(__dirname + '/client/views/workout.html');
});

// Use the exercises routes
app.use('/api/', exerciseRoute);

// 404 Not Found Middleware
app.use((req, res, next) => {
    res.status(404)
        .type('text')
        .send('Page Not Found');
});

// Set up server
app.listen(portNum, () => {
    console.log(`Server listening on port ${portNum}`);
});

