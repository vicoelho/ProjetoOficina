require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then (() => {
    app.emit('pronto');
})
.catch (e => console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middlewares')
const routes = require('./routes');

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'frontend')));

const sessionOptions = session({
    secret: 'adwasgr3qw6432as352gtf2raff3q',
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//Nossos middlewares
app.use(middlewareGlobal);
app.use(csrf());
app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
});