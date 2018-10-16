const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
  var now = new Date().toString();

  console.log(`${now}: ${req.method} ${req.url}`)
  next();
});

hbs.registerHelper('getCurrentYear', () =>{
   return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs',{
       pageTitle: 'Home Page',
       welcomeMessage: 'welcome to my website',
       currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Uable to handel request'
    })
});

app.listen(3000, () =>{
    console.log('Server is up on port 3000')
});