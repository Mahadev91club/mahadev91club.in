require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./src/config/db');

const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'src/views/layouts/main'));

// Routes
app.use('/', require('./src/routes/pages'));
app.use('/auth', require('./src/routes/auth'));
app.use('/wallet', require('./src/routes/wallet'));
app.use('/game', require('./src/routes/game'));
app.use('/admin', require('./src/routes/admin'));

// 404
app.use((req, res) => res.status(404).render('error', { title: 'Not Found', message: 'Page not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
