const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'images')));

//Home
app.get('/', (req,res) => {
    res.render('index',{
        title: 'Air-Quality Monitoring System'
    });
});



const port = process.env.PORT || 3000; //PORT
app.listen(port, () => console.log(`Server Started...Port ${port}`));