const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; //PORT
app.use(express.json());

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'public')));

/*
const sensorVals=[
    {id:1, name:'Humidity', reading:'0'},
    {id:2, name:'Temperature', reading:'0'},
    {id:3, name:'Carbon Monoxide Reading', reading:'0'},
    {id:4, name:'Carbon Dioxide Reading', reading:'0'},
];
*/

const members =[
    {name:'Marc Lawrence C. Pua'},
    {name:'Macrisanta Jasmin'},
    {name:'Jasper Adrian S. Escala'},
    {name:'Rodmar Lanuza'},
];

//Home
app.get('/', (req,res) => {
    res.render('index',{
        title: 'Home'
    });
});

//Dashboard
app.get('/dashboard', (req,res) => {
    res.render('dashboard',{
        title: 'Dashboard'
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
        title: 'Team',
        team: members 
    });
});




app.listen(port, () => console.log(`Server Started...Port ${port}`));