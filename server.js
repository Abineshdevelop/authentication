const express=require('express')
const app=express()
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin')
const connectDB = require('./db/connectDB');
const session = require('express-session');
const noCache=require('nocache')
const hbs = require('hbs');

connectDB();

app.set('view engine', 'hbs');


app.use(noCache()); 


app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, //1 hour exp aft
    httpOnly: true
  }
}));

app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//app.set('views',path.join(__dirname, 'views'));

app.use('/user',userRoutes)
app.use('/admin',adminRoutes)


hbs.registerHelper('inc', function (value) {
  return parseInt(value) + 1;
});


app.listen(PORT,()=>{
    console.log("server is running in port",`${PORT}`)
})


