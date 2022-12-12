/*  
Use Express, lodash and node.js to create server and access to html files for server
*/
//imports
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
//const UserInfoSchema = require('./models/userinfo');
const Information = require('./models/userinfo');
const { result } = require('lodash');

//variables
const app = express();
//connect to mongoDB
const dbURI = 'mongodb+srv://Project6:Easynow123@cluster0.hhg1qre.mongodb.net/answers?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
app.set('views', 'pages');


//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));//'dev' logs, :method, :url, :status, :response-time ms - :res[content-length] to console

// mongoose and mongo sandbox routes
app.get('/survey-result', (req, res) => {
    const surveyResult = new Information({
        username: 'Jane Smith',
        age: '89',
        answer: true
    });

    surveyResult.save()
    .then((result) => {
        res.send(result);//added ; after already functioning.
    })
    .catch((err) => {
        console.log(err);
    });
});

//server get request handling
//200gets
app.get('/', (req, res)=>{
    const usernames = [
        {user: ' ', result: 0.00}
        ]
    res.render('home', { title: 'Home', usernames });//the object {} allows me to insert additional info to the browser tab
});

app.get('/survey', (req, res)=>{

    res.render('survey', { title: 'survey' });
});

app.get('/results', (req, res)=>{
    Information.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
    res.render('results', { title: 'Results', Information: result });
});

app.post('/', (req, res) =>{
    console.log(req.name);
});

app.post('/results', (req, res)=> {
    console.log(req.body);
});

//300 gets (redirects)
app.get('/home', (req, res) =>{
    res.redirect('/');
});

//404 gets (page not found) KEEP AT BOTTOM as catchall
app.use((req, res)=>{
    res.status(404).render('404', { title: 'Error' });
});
