const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; //PORT
app.use(express.json());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'public')));
var temperature = 0.00,
    humidity = 0.00,
    carbon1 = 0.00,
    carbon2 = 0.00;

//Home
app.get('/', (req,res) => {
    res.render('index',{
        title: 'Home'
    });
});

//Dashboard
app.get('/dashboard', (req,res) => {
    res.render('dashboard',{
        title: 'Dashboard',
        temp: temperature,
        humR: humidity,
        co2: carbon2,
        co: carbon1
    });
});

//about
app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About'
    });
});

//team
app.get('/team', (req,res) => {
    res.render('team',{
        title: 'Team'
    });
});

app.put('/sensorUpdate',(req, res) => {
    temperature = req.body.temp;
    humidity = req.body.Rhum;
    carbon2 = req.body.co2;
    carbon1 = req.body.co;
    res.send("data sent!!!");
});

app.listen(port, () => console.log(`Server Started...Port ${port}`));