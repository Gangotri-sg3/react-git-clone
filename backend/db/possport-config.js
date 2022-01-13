const LocalStrategy = require('passport-local').Strategy;
const db = require('./dbconfig')
const bcrypt = require('bcrypt');

module.exports = function(passport){
  console.log("in possport file");
  passport.use(
    new LocalStrategy((email,password,done) => {
      db('users').where('email', email).first().then( function (user) {
        if (!user) {
            return done(null, false);
        }
        bcrypt.compare(password,user.password,(err,result)=>{
         console.log("ressult in comparing::",result)
          if(err){
            console.log("err in comparing",err)
          }
          if(result == true){
            return done(null, user);

          }
          else{
            return done(null, false);

          }
        })
    })
    .catch(function (err) {
        return done(err);
    });
    })
  );
  passport.serializeUser((user,cb) => {
    cb(null,user.id)
  })

    passport.deserializeUser((id, cb) => {
    db('users').where({id}).first()
    .then((user,err) => { cb(null, user); })
    .catch((err) => { cb(err, user); });
  });
}
// function intialize(passport) {
//     const authenticateUser =  (email, password, done) => {
//         console.log("email ::",email)
//         db('users').where('email', email).first().then( function (user) {
//             if (user == null) {
//                 return done(null, false, { message: 'No user with that email' });
//             }
//             if (!bcrypt.compareSync(password, user.password)) {
//                 return done(null, false, { message: 'Password incorrect' });
//             }
//             return done(null, user);
//         })
//         .catch(function (err) {
//             return done(err);
//         });
//     };

//   passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
//   passport.serializeUser((user, done) => {
//     console.log("user :",user);
//     console.log("user :",user);
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     db('users').where({id}).first()
//     .then((user) => { done(null, user); })
//     .catch((err) => { done(err, null); });
//   });

// }

// module.exports = intialize;

