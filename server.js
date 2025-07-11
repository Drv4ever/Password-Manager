const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./models/user');
const vaultModel = require('./models/vault');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/passwordmanager', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Authentication Middleware
function checkAuth(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
            req.user = verified;
            next();
        } catch {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
}

// Home (Dashboard)
app.get('/', checkAuth, async (req, res) => {
    const user = await userModel.findById(req.user.id);
    const vaultItems = await vaultModel.find({ owner: user._id });
    res.render('index', { user, vaultItems });
});

// Register
app.get('/register', (req, res) => res.render('register'));

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ username, email, password: hashedPassword });
    res.redirect('/login');
});

// Login
app.get('/login', (req, res) => res.render('login'));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secretkey');
        res.cookie('token', token);
        res.redirect('/');
    } else {
        res.send('Invalid Credentials');
    }
});

// Add Vault Item
app.post('/create', checkAuth, async (req, res) => {
    const { site, siteUsername, sitePassword } = req.body;
    await vaultModel.create({
        owner: req.user.id,
        site,
        siteUsername,
        sitePassword
    });
    res.redirect('/');
});

// Logout
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

app.listen(3000, () => console.log('http://localhost:3000'));
