var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var knex = require('../backend/db/dbconfig')
var cors = require('cors')
const app = express();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const session = require('express-session')
const port = 4000;

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(
  session({
    key: 'userId',
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24
    }
  })
)
app.use(cookieParser('secretecode'));
app.use(passport.initialize())
app.use(passport.session())
require('../backend/db/possport-config')
var usersRouter = require('./router/users');

app.use('/user', usersRouter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const jwt = require('jsonwebtoken')

var user ;

app.post('/signup', async (req, res) => {
  try {
    console.log("req.body ::", req.body.email)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user = req.body.username;
    const addUser = {
      name: req.body.name,
      username: req.body.username,
      profile: req.body.profile,
      email: req.body.email,
      password: hashedPassword
    }
    console.log("add user :", addUser);
    knex('users').insert(addUser).returning([
      'id',
      'name',
      'profile',
      'username',
      'email'
    ]).then(async (row) => {
      console.log("row in addding user :", row[0]);
      res.json(row[0])
    }).catch((err) => {
      console.log("error in sign up query :", err)
    })
  }
  catch (err) {
    console.log('err in signup', err);
  }
})

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password;

  knex('users').where('email', email).then(function (result) {
    console.log("user :",user)
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          const id = result[0].id;
          const token = jwt.sign({ email, id ,user}, 'jwtSecret', {
            expiresIn: 300
          })
          console.log("session before ::", req.session.user)
          req.session.user = result;
          console.log("successfull login ", result)
          console.log("session after ::", req.session.user)

          res.json({ auth: true, token: token, result: result })
        } else {
          res.json({ auth: false, message: "wrong combination" })
        }
      })
    } else {
      res.json({ auth: false, message: "not exists" })
    }
  })

});

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.send("we need token")
  } else {
    jwt.verify(token, 'jwtSecret', (decoded, err) => {
      if (err) {
        res.json({ auth: false, message: "u failed to authenticate" })
      } else {
        req.userId = decoded.id;
        next();
      }
    })
  }
}

app.get('/is_user_auth', verifyJWT, (req, res) => {
  res.json({ message: "authenticated" })
})

app.get('/login', (req, res) => {
  console.log("req.session.user :", req.session.user)
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user })
  } else {
    res.send({ loggedIn: false })

  }
})

app.get('/', (req, res) => {
  console.log("app started!!");
  knex('issues').select('id', 'description', 'creator_id', 'assignee_id', 'lable_id', "title").then(rows => {
    res.json(rows)
  })
})

app.get('/labels', (req, res) => {
  console.log('getting labels');
  knex('labels').select('id', 'description', 'label_name', 'color').then(rows => {
    console.log("labels", rows)
    res.json(rows)

  })
})

app.post('/labels', (req, res) => {
  let newLabel = {
    label_name: req.body.label_name,
    description: req.body.description,
    color: req.body.color
  }
  console.log("new labels ::::::::::::", newLabel)
  knex('labels')
    .insert(newLabel).returning(['id', 'label_name', 'description', 'color'])
    .then(rows => {
      res.json(rows[0]);
    });
})

app.get('/all_labels', (req, res, next) => {
  knex('labels').select('id', 'label_name', 'color', 'description').then(rows => {
    // console.log("labelsss :::::::::", rows)
    res.json(rows)
  })
});

app.get('/all_users', (req, res, next) => {
  knex('users').select('id', 'name', 'username', 'email', 'profile').then(rows => {
    res.json(rows)
  })
});

app.get('/all_issues', (req, res, next) => {
  knex('issues')
    .leftJoin('labels', 'issues.lable_id', 'labels.id')
    .leftJoin('users', 'issues.assignee_id', 'users.id')
    .select('issues.id', 'issues.title', 'issues.description', 'issues.created_at', 'issues.creator', 'issues.is_open', 'labels.label_name as label', 'labels.color as color', 'users.username as assignee').then(rows => {
      console.log("issuessss :::::::::", rows)
      res.json(rows)
    })
});

app.post('/issues', async (req, res) => {
  console.log("body ::", req.body)
  let user  = req.body.currentUser;
  console.log("user ::",user)
  let newIssue = {
    title: req.body.title,
    description: req.body.description,
    creator: req.body.currentUser,
    lable_id: req.body.label_id,
    assignee_id: req.body.assignee_id,
    is_open: true,
  }
let issue_id ;
  console.log('new issue ::', newIssue)
  await knex('issues')
    .insert(newIssue).returning(['id', 'title', 'description', 'creator', 'lable_id', 'assignee_id', 'is_open']).limit(10)
    .then(rows => {
    
      console.log('new in post issue ::', rows[0])
      issue_id = rows[0].id
      res.json(rows[0]);
    })
    let newActivity = {
      issue_id:issue_id,
      label_id:req.body.label_id,
      label_creator:req.body.currentUser,
      assignee_id:req.body.assignee_id,
      assignee_creator:req.body.currentUser
    }
    console.log("new activity ===============",newActivity)

    knex('activity')
    .insert(newActivity).returning(['id','issue_id','label_id','label_creator','label_createdat','assignee_id','assignee_creator','assignee_createdat']).then(row => {
      console.log("new activity row :::::::::::::::::",row[0])
    }

    )
})

app.get('/comments/:id', async (req, res) => {
  console.log("id", req.params.id)
  knex('issues')
    .leftJoin('comments', 'issues.id', 'comments.issue_id')
    .leftJoin('labels', 'issues.lable_id', 'labels.id')
    .leftJoin('users', 'issues.assignee_id', 'users.id')
    .leftJoin('activity', 'issues.id', 'activity.issue_id')
    .select('issues.id', 'issues.title', 'issues.created_at','issues.comments','activity.label_createdat','activity.label_creator','activity.assignee_creator','activity.assignee_createdat', 'comments.created_at','comments.comment','comments.posted_by','issues.description', 'issues.comments', 'issues.creator', 'issues.is_open', 'comments.comment AS comments', 'comments.posted_by AS user_posted_by', 'labels.label_name as label', 'labels.color as color', 'users.username as assignee')
    .where({ 'issues.id': req.params.id }).then((row) => {
      console.log("row  inside:::::::::::::::::::", row)
      res.json(row);
    })
});
function addComment(db, newComment) {
  console.log(newComment)
  return db
    .insert(newComment)
    .into("comments")
    .then(rows => {
      return rows[0];
    });
}
app.post('/addComment', async (req, res) => {
  let newComment = {
    issue_id : req.body.id,
    comment:req.body.comment,
    label_id:0,
    posted_by:req.body.posted_by
  }
  console.log("comments ::: ",newComment)
  await knex('comments')
  .insert(newComment).returning(['id', 'comment', 'issue_id', 'posted_by'])
  .then(rows => {
    console.log('new in comment on issue ::', rows[0])
    res.json(rows[0]);
  })

})


module.exports = app;