const express = require('express');
const router = express.Router();
const express_validator = require('express-validator'); 
const nodemailer = require('nodemailer');
const passport = require('passport');

const student = require('./model/student');
const courses = require('./model/courses');
const { aauth } = require('./auth');
// Define the home page route courses
router.get('/', (req, res)=> {
  let mes ='';
  courses.find({},(err,courses)=>{
    res.render('index',{
      courses,
      mes
    });
  });
});
// post request 

router.get('/search',async (req, res)=> {
let students = await student.find({});
res.render('search',{
  students
});
  
});



// admin 
router.get('/admin', (req, res)=> {
  res.render('admin');
});
// login 
router.post('/login', (req, res,next)=> {
  passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/admin'
  })(req,res,next)
});
// logout 
router.get('/logout', (req, res)=> {
 req.logout();
 res.redirect('/admin');
});
// register page
router.get('/dashboard',aauth ,(req, res)=> {
  courses.find({},(err,courses)=>{
    res.render('dashboard',{
      courses
    });
});
});
// students register
router.post('/register', async (req, res)=> {
  req.checkBody('name','First name should not empty').notEmpty();
  req.checkBody('last','Last name should not empty').notEmpty();
  
  
  const errors = req.validationErrors();

  if(!errors){
    await student.create({
      First_name: req.body.name,
      Last_name: req.body.last,
      Email: req.body.email,
      Phone: req.body.phone,
      cours_id: req.body.cours_id
    });
    res.redirect('/');
  }
});
// cours registerr
router.post('/register2', async (req, res)=> {
  req.checkBody('name','First name should not empty').notEmpty();
  req.checkBody('last','Last name should not empty').notEmpty();

  
  const errors = req.validationErrors();

  if(!errors){
    
    let cor_id = await courses.find({name: req.body.cours_id});
    await student.create({
      First_name: req.body.name,
      Last_name: req.body.last,
      Email: req.body.email,
      Phone: req.body.phone,
      cours_id: cor_id[0]._id
    });
    res.redirect('/dashboard');
  }
});


router.post('/newcours', async (req, res)=> {
   await courses.create({
      name: req.body.name,
      code: req.body.code,
      teacher: req.body.teacher,
      url: req.body.url,
      describtion: req.body.describtion,
      duree: req.body.duree 
    });
    res.redirect('/dashboard');
  
});


router.get('/dashboard/:id', aauth, (req, res, next)=> {
 next();
}, async (req, res, next)=> {
  let apros = await student.find({cours_id:req.params.id});
  
  res.render('students',{apros});
});

router.get('/cour_:id',   (req, res, next)=> {
 next();
}, async (req, res, next)=> {
  let courses_info = await courses.findById(req.params.id);
  
  
  res.render('courses',{courses_info});
  
});
router.post('/send',(req,res)=>{
  
let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'abdou.teta20@gmail.com',
    pass: 'abdoteta12'
  },
  tls: {
    rejectUnauthorized: true
  }
});

let HelperOptions = {
  from:  `${req.body.name} <abdou.teta20@gmail.com>`,
  to: 'abdou.teta95@gmail.com',
  subject: req.body.subject,
  text: req.body.text
};

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    courses.find({},(err,courses)=>{
      res.render('index', {msg: 'thank you',courses});
    });
   
  });
  
});

router.post('/edite',(req,res)=>{
  var query = {_id:req.body.id};
  let cours = {};
  cours._id = req.body.id,
  cours.name = req.body.name,
  cours.code = req.body.code,
  cours.teacher = req.body.teacher,
  cours.url = req.body.url,
  cours.duree = req.body.duree,
  cours.describtion = req.body.describtion
  courses.update(query, cours,err =>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/dashboard');
    }
  });

  
});

// delete cours request 

router.delete('/delete-:id',function(req,res){
  courses.deleteOne({ _id: req.params.id },(err)=>{
    if(err){
      console.log(err);
     }
    res.send("sucsses");
  });
  
});

// delete student request 

router.delete('/delete:id',function(req,res){
  student.deleteOne({ _id: req.params.id },(err)=>{
    if(err){
      console.log(err);
     }
     console.log(req.params.id);
     
    res.send("sucsses");
  });
  
});
module.exports = router