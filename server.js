if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express =require('express');
const indexRouter =require('./routes/index')
const app=express();
const expresslayout =require('express-ejs-layouts');  
const { default: mongoose } = require('mongoose');
const uri = process.env.DATABASE_URL
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db=mongoose.connection
db.on('error',error => console.error(error))
db.on('open',()=> console.log("connected to mongoosse successfully "))
app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expresslayout)
app.use(express.static('public'))
app.use('/',indexRouter)
app.listen(process.env.PORT || 3000)
