var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var knex = require('../backend/db/dbconfig')
var cors = require('cors')
const app = express();
const passport = require('passport');
const bcrypt = require('bcrypt');
const intializePassport = require('./db/possport-config');
intializePassport(passport);
const port = 4000;

var usersRouter = require('./router/users');

app.use('/', usersRouter);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());


// app.post('/signup', async (req, res) => {
//   try {
//      console.log(req.body)
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const addUser = {
//         name:req.body.name,
//         username:req.body.username,
//         email:req.body.email,
//         password:hashedPassword
//     }
//     console.log("add user :",addUser);
//     knex('users').insert(addUser).returning([
//         'id',
//         'name',
//         'username',
//         'email'
//     ]).then(row => {
//         console.log("row in addding user :",row[0]);
//         res.json(row[0])
//     }).catch((err) =>{
//         console.log("error in sign up query :",err)
//     })
//   }
//   catch (err) {
//      console.log('err in signup',err);
//   }
// })


app.get('/', (req, res) => {
  console.log("app started!!");
  knex('issue').select('id', 'description','creator_id','assignee_id','lable_id',"title").then(rows => {
    res.json(rows)
  })
})

app.get('/labels',(req,res) => {
  console.log('getting labels');
  knex('labels').select('id', 'description','label_name','color').then(rows => {
    console.log("labels",rows)
    res.json(rows)

  })
})

app.post('/labels' ,(req,res) => {
  let newLabel = {
    label_name:req.body.label_name,
    desciprion:req.body.description,
    color:req.body.color
  }
  knex('labels')
    .insert(newLabel).returning(['id','label_name','description','color'])
    .then(rows => {
      res.json(rows[0]);
    });
})

app.post('/issues',async(req,res) => {
    let newIssue = {
      title: req.body.issue_title,
      description: req.body.description,
      creator_id: req.user.username,
      lable_id: req.body.label,
      assignee_id: req.body.assignee,
      is_open: true,
   }
   await knex('/issue')
      .insert(newIssue).returning(['id','title','description','creator_id','lable_id','assignee_id','is_open'])
        .then(rows => {
          res.json(rows[0]);
        })
})


module.exports = app;
