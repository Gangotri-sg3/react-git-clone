var express = require('express');
var router = express.Router();
// const db = require('../config/dbconfig')
const passport = require('passport');
const bcrypt = require('bcrypt');
const intializePassport = require('../db/possport-config');
const knex = require('../db/dbconfig')

intializePassport(passport);
// add user

function addUser(db, newUser) {
    console.log(newUser)
   return db
     .insert(newUser)
     .into("user_info")
     .then(rows => {
       return rows[0];
     });
  }
  
  // router.route('/login')
  //   .post(passport.authenticate('local', {
  //     successRedirect: '/',
  //     failureRedirect: '/login',
  //     failureFlash: true
  //   }));

    // router.post('/signup', async (req, res) => {
    //     try {
    //        console.log("req.body ::",req.body)
    //       const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //       const addUser = {
    //           name:req.body.name,
    //           username:req.body.username,
    //           email:req.body.email,
    //           password:hashedPassword
    //       }
    //       console.log("add user :",addUser);
    //       knex('users').insert(addUser).returning([
    //           'id',
    //           'name',
    //           'username',
    //           'email'
    //       ]).then(row => {
    //           console.log("row in addding user :",row[0]);
    //           res.json(row[0])
    //       }).catch((err) =>{
    //           console.log("error in sign up query :",err)
    //       })
    //     }
    //     catch (err) {
    //        console.log('err in signup',err);
    //     }
    //   })
  
module.exports = router;

