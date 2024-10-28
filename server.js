const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const { createUser, authenticateUser } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests and serving static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session management
app.use(session({
    secret: 'your-secret-key', // Change this to a random secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve other pages without .html
const servePage = (page) => (req, res) => {
    res.sendFile(path.join(__dirname, 'public', page));
};

// Routes for different pages
app.get('/user/:username', servePage('user/username.html'));
app.get('/project/:projectID', servePage('project/projectID.html'));
app.get('/settings', servePage('settings/settings.html'));
app.get('/create', servePage('create/create.html'));
app.get('/editor', servePage('editor/editor.html'));
app.get('/login', servePage('login/login.html'));
app.get('/signup', servePage('signup/signup.html'));
app.get('/explore', servePage('explore/explore.html'));
app.get('/home', servePage('home/home.html'));

// User signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const result = createUser(username, password);
    if (result.success) {
        req.session.username = username; // Log in the user
        res.redirect('/'); // Redirect to home page
    } else {
        res.status(400).send(result.message);
    }
});

// User login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const result = authenticateUser(username, password);
    if (result.success) {
        req.session.username = username; // Log in the user
        res.redirect('/'); // Redirect to home page
    } else {
        res.status(400).send(result.message);
    }
});

// User logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.redirect('/'); // Redirect to home page after logout
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
